const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const { User } = require('../_helpers/myFunctions/db');
const { jwtSecret, envMode, token_expires_in } = require('../_helpers/myFunctions/config');
const { functions } =  require('../_helpers/myFunctions');



module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    resetPassword,
};


async function authenticate({ email, password }) {
    const user = await User.findOne({ email: email });
    console.log('user: ' + user.email);
    if (!user) return { error: 'Username not found'};
    
    // console.log('password: ' + password);
    // console.log('user.hash: ' + user.hash);
    if (user && bcrypt.compareSync(password, user.hash)) {        
        console.log('ll');
        return  { token: jwt.sign(
                    { sub: user._id, },
        	        jwtSecret), 
                  userId:  user._id,
                //   userLevel: user.userLevel,
                //   expiresIn: functions.tokenTimeToSeconds(token_expires_in)
                };
    }

    else return { error: 'Invalid Username & or password'};
}

async function getById(id) {
    return await User.findOne({'_id': id}).select('-hash');
}

//  This is for the search Query!
async function getAll(page, limit, sort = -1) {

   
    // let result = await User.find().select('-hash').sort({ dateCreated: sort });
    let result = await User.find().select('').sort({ dateCreated: sort });
    
    return { result };
}


async function create(userParam) {
    // validate
    if (userParam.email && await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" exists';
    }
    const user = new User(userParam);
    
    // hash password
    if (userParam.password) {
    	// console.log(userParam.password)
        user.hash = await bcrypt.hashSync(userParam.password, 15);
    }
    
    return await user.save();
}


// async function update(userParam, userLevelObj) {
async function resetPassword(email, newPassword) {
    const user = await User.findOne(({ email: email }));

    // validate
    if (!user) throw 'User not found';
    
    // hash password if it was entered
    if (newPassword) {
        user.hash = bcrypt.hashSync(userParam.password, 15);
    }

    return await user.save();
}
