const mongoose = require('mongoose');

const { mongodbUri } = require('./config');

// mongoose.connect(mongodbUri, { useNewUrlParser: true }, { useUnifiedTopology: true }).then(
mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
    err => { /** handle initial connection error */
        console.log("Mongo server not running!!!");
        console.log('err: ' + JSON.stringify(err));
        // throw "Mongo server not running!!!"  This doesn't work here!!!
        process.exit(1);
        
    }
  );
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
mongoose.set('bufferCommands', false);


module.exports = {
    User: require('../../models/user.model').userModel,
};
