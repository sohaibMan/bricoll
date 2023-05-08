import {ObjectId} from "mongodb";
import db from "../lib/mongodb";
import {User} from "../types/resolvers";

async function getUserById(user_id: ObjectId) {
    const usersCollection = db.collection("users")
    // todo (redis) : caching the data
    return await usersCollection.findOne({_id: new ObjectId(user_id)}) as unknown as User;
}

function htmlMarkupGenerator(injectedHtmlBody: string) {
    return `
 <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>New proposal submitted for your project</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.5;
                color: #333;
                background-color: #f7f7f7;
                padding: 20px;
              }
              h1 {
                font-size: 24px;
                font-weight: bold;
                margin-top: 0;
                margin-bottom: 20px;
              }
              p {
                margin-top: 0;
                margin-bottom: 20px;
              }
              a {
                color: #0072c6;
                text-decoration: none;
              }
              a:hover {
                text-decoration: underline;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
              }

              .signature {
                margin-top: 50px;
                font-style: italic;
                color: #777;
              }
            </style>
          </head>
          <body>
            <div class="container">
                ${injectedHtmlBody}
              <p>We hope this email finds you well. We wanted to let you know that a freelancer has submitted a proposal for your project.</p>
              <p>You can review the proposal by logging into your account and going to the project page.</p>
              <p>If you have any questions or concerns about the proposal or the project, please don't hesitate to <a href="[Contact link]">contact us</a>.</p>
              <p>Thanks for using our platform!</p>
              <p class="signature">Sincerely,<br>The Bricoll Team</p>
            </div>
          </body>
        </html>
`
}

export {getUserById, htmlMarkupGenerator}