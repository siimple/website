//Import libs
var stattic = require('stattic');

//Set the folder with the static files
stattic.set('static', './public');

//Set the port
stattic.set('port', 5000);

//Run the server
stattic.run();
