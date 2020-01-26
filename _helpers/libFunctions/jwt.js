const expressJwt = require('express-jwt');

// user modules
// const userService = require('../../services/user.service');
const models = require("../../database/models");
const { jwtSecret } = require('../myFunctions/config');
const { envMode } = require('../myFunctions/config');

const baseIndex = '/';

module.exports = jwt;


function jwt() {
    const secret = jwtSecret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            baseIndex + 'users/authenticate',        
            baseIndex + 'users/register',        
        ]
    });
}

async function isRevoked(req, payload, done) {
    // const user = await userService.getById(payload.sub);
    const user = await models.User.findByPk(payload.sub);
    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }
    // if (user.active == false ) { //user account is not active
    //     return done(null, true);
    // }
    done();
};
