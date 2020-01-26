'use strict'
// const { DateTime } = require("luxon");
const mongooseObjId = require('mongoose').Types.ObjectId;

module.exports = {
	genRandom,
	getNumberSeq,
	getQueryObjMatch,
	transfromArray,
	// getDate,
  tokenTimeToSeconds,
  matchPhoneNoInStr
	// checkUserLevel,
	// jsonResponse
}

function genRandom(no = 8, alphaNumeric) {
  let text = "";
  let possible = (alphaNumeric) ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" : "0123456789";
  for (var i = 0; i < no; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

function getNumberSeq(digit) {
  	return digit.toString().padStart(10, '0');
}

function getQueryObjMatch(query, arr, arrChecklist=[]) {
	let obj = {};
	
	arr.forEach(val => { 
			// added the following lines
			if(query[val] && arrChecklist.includes(val)) {
				obj[val] = mongooseObjId(query[val])
				// continue;		// skip this iteration
			}
			else if (query[val]) 
		// 
			obj[val] = query[val];
	});	
	return obj;
}

function transfromArray(dataArray) {
	// console.log('DataArray: '+ dataArray)
	let resultArray = [];
	let i;
	for( i=0; i<dataArray.length; i++) {
		resultArray.push(Object.values(dataArray[i]).map(function(key) {
			return  String(key);
		}));
	};
	// console.log('resultArray: '  + JSON.stringify(resultArray) );
	return resultArray;
	// return dataArray;
}

function tokenTimeToSeconds(str) {
	const timeXter = str.substr(-1);
	const timeNo = parseInt(str.slice(0, -1), 10);
	if (isNaN(timeNo, 10)) throw 'Invalid TOKEN_EXPIRES_IN'
	// do the conversion  
	if (timeXter === "h") return 60*60* timeNo
	if (timeXter === 'd') return 60*60*24* timeNo
}

function matchPhoneNoInStr(str) {
  const re = /\d{11}/g
  let match
  while ((match = re.exec(str)) != null) {
    // add space to index: + 3 & 3
    let matchIndex = match.index;
    str = str.substr(0, matchIndex) +'234 ' + str.substr(matchIndex+1, 3) + ' ' + str.substr(matchIndex+4, 3) + ' ' + str.substr(matchIndex+7, 3) + str.substr(matchIndex+10);
  }
  return str;
}

// function transfromArray(dataArray) {
// 	console.log('DataArray: '+ dataArray)
// 	let resultArray = [];
// 	dataArray.forEach(function( elementObj ) {
// 		resultArray.push(Object.keys(elementObj).map(function(key) {
// 		return  String(elementObj[key]);
// 		}));
// 	});
// 	console.log('resultArray: '  + JSON.stringify(resultArray) );
// 	return resultArray;
// 	// return dataArray;
// }

// function genAccNo(no = 10) {
//   let text = "";
//   const possible = "0123456789";
//   for (var i = 0; i < no; i++)
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   return text;
// }


// function checkUserLevel(req, res, user_level) {
// 	if (req.user.role !== "super-admin"){
// 		console.log(req.user.role)
// 		res.status(403).json({ status: false, message: 'User is not permitted to access this resource' });
// 		return false;
// 	}
// 	else { return true; }
// }

// options is optional and would be included into the data object
function jsonResponse(success, data, pagingInfo) {
	// returns the object. Place this into your res.json(obj)
	return {
		success: success,
		data: {
			paging: pagingInfo ? pagingInfo : null,
			result: data ? data : null
		}
	}
}

// next is called here to pass errors to the error-handler
function checkUserLevel2(currentUserLevel, action, next){
	const admin = ['create admin', 'create acc_mgr', 'create customer',
					'read admin', 'read acc_mgr', 'read customer',
					'update admin', 'update acc_mgr', 'update customer',
					'delete admin', 'delete acc_mgr', 'delete customer' ];

	const permission = {
		'admin': admin,
		'acc_mgr': [],
		'customer': []
	}
	if(permission) {
		return true;
	}
	return false;
}

// function getDate(date = DateTime.local(), noOfDays) {	

// 	return { from: date.toISODate(), to: date.plus({ days: noOfDays }).toISODate() }
// }
