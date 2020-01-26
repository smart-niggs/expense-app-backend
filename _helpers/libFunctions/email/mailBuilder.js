module.exports = {
	newAdmin,
	newUser,
	userUpdated,
	userAcDeactivated,
	newAccount,
	alert,
	otp,
	accBal,
	accStmt,
	depoWithReportStmt
}

const mailHeader = '';	//	add html, body, css here.

const mailFooter =
	'<br><br><br>' +
	'<p>Warm Regards, </p>'+
	'<p>AdaireSave Team.</p>'+
	'<hr/>' +
	'<p><span style="font-size: 9pt;"><a href="https://adaireng.com">Adaire Banking Ltd</a></span><br /><span style="font-size: 9pt;">Ikoyi, Lagos. Nigeria</span></p>' +
	'<p><span style="font-size: 9pt;"><a href="javascript:void(0)">Preferences</a>&nbsp;|&nbsp;<a href="javascript:void(0)">Unsubscribe</a></span></p>';


function newAdmin (user){
	let html = 	mailHeader +
		'<p>Hi ' + user.firstname + ' ,</p>'+
		'<p>An account has been created for you. kindly login using the details below:</p>'+
		'<button><a href="https://app.adaireng.com/login">Login</a></button>'+
		'<p>Username:&nbsp;' + user.phone + ' </p>'+
		'<p>password:&nbsp;' + user.password + ' </p>' +
		'<p><span style="font-size: 9pt;">You are recieving this mail because a new user profile was created for you.</span></p>' +
	mailFooter
	return html;
}

function newUser (user){
	let html = 	mailHeader +
		'<p>Hi ' + user.firstname + ' ,</p>'+
		'<p>An account has been created for you. kindly login using the details below:</p>'+
		'<button><a href="https://app.adaireng.com/login">Login</a></button>'+
		'<p>Username:&nbsp;' + user.phone + ' </p>'+
		'<p>password:&nbsp;' + user.password + ' </p>' +
		'<p>Account Number: ' + user.accountNo + ' </p>'+
		'<p>Account Type: ' + user.type + ' </p>'+
		'<p>Opening Balance : ₦' + user.bal + ' </p>' +
		'<p><span style="font-size: 9pt;">You are recieving this mail because a new user profile was created for you.</span></p>' +
	mailFooter
	return html;
}

function userAcDeactivated (user, deactivated){
	deactivated = deactivated == true ? 'Deactivated.' : 'Activated.'
	let html = 	mailHeader +
		'<p>Hi ' + user.firstname + ' ,</p>'+
		'<p>Your account has been ' + deactivated + '</p>'+
		'<p>Contact the Admin for more information.</p>'+
	mailFooter
	return html;
}


function userUpdated (user){
	let userString = "";
	users = Object.keys(user);

	users.forEach(element => {
		userString += `${element.toString().toUpperCase()} : ${user[element]} \n`
	});
	let html = 	mailHeader +
		// '<p>Hi ' + user.firstname + ' ,</p>'+
		'<p>Your profile has been updated, see the newly update fields:</p>'+
		userString +
		'<p><span style="font-size: 9pt;">You are recieving this mail because your user profile was updated. If you didn\'t initiate or request for this, kindly contact the admmin</span></p>' +
	mailFooter
	return html;
}


function newAccount (options) {
	let html =
	mailHeader +
		'<p>Hi ' + options.firstname + ' ,</p>'+
		'<p>An Account has been created for you on the Ledger App Platform.</p>'+
		'<p>Account Number: ' + options.accountNo + ' </p>'+
		'<p>Account Type: ' + options.type + ' </p>'+
		'<p>Initial Account Balance : ₦' + options.bal + ' </p>' +
		// '<p>Account Type Desciption:&nbsp;' + options.desc + ' </p>' +
		// '<p>Account Status:&nbsp;' + option.status + ' </p>' +
		'<p><span style="font-size: 9pt;">You are recieving this mail because an account was created for you.</span></p>' +
	mailFooter

	return html;
}

// accountObj = {desc: `Deposit of: ${newTractn.totalAmt}, to: ${newTractn.accountNo} on ${allTransactions[2].dateCreated}`,
//  oldBal:account.bal, newBal: allTransactions[1].bal};

// All the Alert.
function alert (options, type) {
	// console.log('alert options: ' + JSON.stringify(options));
	let html =
	mailHeader +
		'<p>Hi ' + options.acc.user.firstname + ' ,</p>'+
		'<p>Account Number: ' + options.acc.accountNo + ' </p>'+
		'<p>Account Type: ' + options.acc.type + ' </p>'+
		// '<p>Transaction Type: ' + type + ' </p>'+
		// '<p>Amount: ' + options.amount + ' </p>'+
		'<p>Previous Account Balance ₦' + options.acc.bal + ' </p>' +
		'<p>New Account Balance ₦' + options.newBal + ' </p>' +
		'<p>Desciption:&nbsp;' + options.desc + ' </p>' +
	mailFooter

	return html;
}

function otp (options) {
	let html =
	mailHeader +
		'<p>Hi ' + options.acc.user.firstname + ',</p>'+
		options.desc +		
	mailFooter

	return html;
}

function accBal (options) {
	let html =
	mailHeader +
		'<p>Hi ' + options.user.firstname + ',</p>'+
		'<p>Your Balance for the Account(' + options.accountNo + ') is ₦'+ options.bal + '<p>'+
	mailFooter
	return html;
}


function accStmt (options) {
	let html =
	mailHeader +
		'<p>Hi ' + options.user.firstname + ',</p>'+
		'<p>Kindly find your generated Account statement attached <p>'+
	mailFooter
	return html;
}


function depoWithReportStmt (options) {
	let html =
	mailHeader +
		'<p>Kindly find your generated Account statement attached <p>'+
	mailFooter
	return html;
}
