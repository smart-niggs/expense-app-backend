const { mailjetPublicKey, mailjetSecretKey, envMode } =  require('../../myFunctions/config');
const { bufferTo64 } = require('../base64Converter');
const mimeTypes = require('../mimeTypes');

const mailjet = require ('node-mailjet').connect( mailjetPublicKey, mailjetSecretKey );

module.exports = {
  sendMail
}


async function sendMail(to, subject, html, fileType = undefined, base64Content=undefined, bufferString = undefined, filename = undefined, attachment = false) {
  // console.log('html: ' + html);
  if (envMode !== 'production') subject = "Test ".concat(subject)  // concat is a bit faster tho

	// let to = 'smartniggs@gmail.com'; let subject= 'Att'; let html='<p>Hi !!! </p>';
	// let contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';	let filename = 'file';	
		if (bufferString) base64Content = await bufferTo64(bufferString);

      let from =      { "Email": "noreply@adaireng.com", "Name": "AdaireSave" }
      to = 			[{ "Email": to }]
      // cc = 			[{ "Email": 'ledger.app10@gmail.com' }]
      cc = 			[]
      let bcc =       (envMode === 'production') ? [{ "Email": 'ledger.app10@gmail.com' }, { "Email": "adairesave@adaireng.com" }] : [{ "Email": 'ledger.app10@gmail.com' }];		
      // let bcc = [{ "Email": "adairesave@adaireng.com" }, { "Email": 'ledger.app10@gmail.com' }]
      let msgObject = {"From": from, "To": to, "Cc": cc, "Bcc": bcc, "Subject": subject, "HTMLPart": html }

		
		if (attachment){
        	attachment= [{ "ContentType": mimeTypes[fileType], "Filename": filename, "Base64Content": base64Content }];               
        	if( base64Content && filename ) msgObject['Attachments'] = attachment 
		}

        // Call the API to send mail.
		mailjet.post("send", {'version': 'v3.1'}).request({ "Messages":[ msgObject ]})
			.then(message => {
			// log to logger                
			console.log('Email delivered to user');
			})
			.catch(err => {
					// log to logger
					// SEND Mail to Admin ooh
					// pass next parameter here to be called on error
					console.log('Mail Send Error: ' + err );
			});
}