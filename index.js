require("dotenv").config();
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const REGION = "ap-south-1"; //e.g. "us-ea st-1"
const ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
const SECRET_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;

const client = new SESClient({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  },
});

// subject of the email
SUBJECT = "Amazon SES Test";
// The email body for recipients with non-HTML email clients.
BODY_TEXT =
  "Amazon SES Test\r\nThis email was sent with Amazon SES using the AWS SDK.";
// The HTML body of the email.
BODY_HTML =
  "<html><body><h1>Amazon SES Test</h1><p>This email was sent with <a href='https://aws.amazon.com/ses/'>Amazon SES</a> using the AWS SDK</p></body></html>";

const input = {
  Source: "example@somedomain.com", // email from which you want to send the email
  Destination: {
    ToAddresses: ["name@gmail.com"], // list of emails to send the mail
  },
  Message: {
    Subject: {
      Data: SUBJECT,
      Charset: "UTF-8",
    },
    Body: {
      Html: {
        Data: BODY_HTML,
        Charset: "UTF-8",
      },
      Text: {
        Data: BODY_TEXT,
        Charset: "UTF-8",
      },
    },
  },

  ConfigurationSetName: "my-first-configuration-set", // get configuration set from you aws ses console
};
client
  .send(new SendEmailCommand(input))
  .then(() => {
    console.log("Email Sent");
  })
  .catch((error) => {
    console.log(error);
  });
