const { envMode } = require('./config');
module.exports = errorHandler;

function errorHandler(err, req, res, next) {

	// console.log('error: ' + JSON.stringify(err));

	if (res.headersSent){
		console.log
	}

    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ status: 'error', message: err });
    }

    if (err.name === 'Validation error') {
        // mongoose validation error

        return res.status(400).json({ status: 'error', message: err.message });
    }

    if (err.name === 'Unauthorized error') {
        return res.status(401).json({ status: 'error', message: 'Unauthorized error, Invalid Credentials' });
    }

    if (err.message === 'Not Found') {
        return res.status(404).json({ status: 'error', message: 'Not Found' });
    }

    if (err.message === 'jwt expired' || err.code === 'revoked_token') {
        // jwt authentication error
        return res.status(401).json({ status: 'error', message: 'Token Expired' });
        // return res.status(404).json({ status: 'error', message: err });
    }

    // default to 500 server error
	if (envMode == 'development' || envMode == 'staging') console.log(err);
    return res.status((err.status)? err.status: 500).json({ status: 'error', message: err.message });
}

// function

// error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     // res.locals.message = err.message;
//     // res.locals.error = req.app.get('env') === 'development' ? err : {};

//     if (res.headersSent) {
//         return next(err)
//     }
//     res.status(err.status || 500);
//     const error = req.app.get('env') === 'development' ? err : {};

//     res.json({
//         status: `${error.status} error`,
//         message: error.message,
//     });
// });
