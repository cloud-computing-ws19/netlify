require('dotenv').config();
const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.DOMAIN,
});

exports.handler = function(event, context, callback) {
  // TODO Email und Namen parsen
  const { recipient, name } = JSON.parse(event.body);

  mailgun
    .messages()
    .send({
      to: recipient,
      from: 'my-function@netlify.com',
      subject: 'Welcome to Netlify Functions!',
      text: `Hello ${name}, good to have you on board!`,
    })
    .then(res =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ result: res.message }),
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({ result: err.message }),
      })
    );
};
