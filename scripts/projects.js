//Import dependencies
var path = require('path');
var utily = require('utily');

//Import projects data list
var projects = require('../projects.json');

//Generate the project path
var projectPath = function(id)
{
  //Return the package.json path
  return path.resolve(process.cwd(), './bower_components/' + id + '/package.json');
};

//Parse the projects list
module.exports = function(cb)
{
  //Projects iterator
  var projects_iterator = function(index, item, next)
  {
    //Import the project package.json path
    var pkg_path = projectPath(item.name);

    //Read the package info
    return utily.json.read(pkg_path, 'utf8', function(error, data)
    {
      //Check the error
      if(error){ return cb(error, null); }

      //Save the project version
      projects[index].version = data.version;

      //Save the project description
      projects[index].description = data.description;

      //Continue with the next project
      return next();
    });
  };

  //Projects read done
  var projects_done = function()
  {
    //Call the callback method with the projects list
    return cb(null, projects);
  };

  //Parse each project
  return utily.eachAsync(projects, projects_iterator, projects_done);
};
