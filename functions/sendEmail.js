require('dotenv').config();
const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.DOMAIN,
});

exports.handler = function(event, context, callback) {
  const { recipient, name } = JSON.parse(event.body);
  console.log(`Email ---> ${recipient}`);
  console.log(`Name --> ${name}`);
  // callback(null, {
  //   statusCode: 200,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //   },
  //   body: event.body,
  // });
  mailgun
    .messages()
    .send({
      to: recipient,
      from: 'my-function@gmail.com',
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
