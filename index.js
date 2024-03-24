// import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"; // ES Modules import
// const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses"); // CommonJS import

// const { client } = require("./sesconfig");
require("dotenv").config();

// Set the AWS Region.

// const {
//   SESv2Client,
//   CreateEmailTemplateCommand,
//   SendEmailCommand,
// } = require("@aws-sdk/client-sesv2"); // ES Modules import
const {
  SESv2Client,
  SendEmailCommand,
  CreateEmailTemplateCommand,
} = require("@aws-sdk/client-sesv2"); // CommonJS import
const REGION = "ap-south-1"; //e.g. "us-ea st-1"
const client = new SESv2Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

// const template_input = { // CreateEmailTemplateRequest
//   TemplateName: "Test-Template", // required
//   TemplateContent: { // EmailTemplateContent
//     Subject: "DUmmy sub",
//     Text: "Random Text",
//     Html: "<b>alsdfjalsjdfajsdf</b> alsdfjalfjdasdfjlafd",
//   },
// };
// const template_command = new CreateEmailTemplateCommand(template_input);
// const template_response = client.send(template_command);

const input = {
  // SendEmailRequest
  FromEmailAddress: "sumesh@m.thetechmaze.me", // required
  Destination: {
    // Destination
    ToAddresses: [
      // AddressList
      "rsumesh2020@gmail.com",
    ],
  },
  Content: {
    // EmailContent
    Simple: {
      // Message
      Subject: {
        // Content
        Data: "From V2", // required
        Charset: "UTF-8",
      },
      Body: {
        // Body
        Html: {
          Data: "<b>Hello</b> World", // required
          Charset: "UTF-8",
        },
      },
    },
  },
  ConfigurationSetName: "my-first-configuration-set",
};
const command = new SendEmailCommand(input);
const response = client.send(command);
