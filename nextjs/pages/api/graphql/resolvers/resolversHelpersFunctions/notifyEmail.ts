import {ObjectId} from "mongodb";
import db from "../../../../../lib/mongodb";
import emailService from "../../../../../lib/email";
import {User} from "../../../../../types/resolvers";

const usersCollection = db.collection("users")

async function OnNewProposal(user_id:ObjectId){
    const user = await usersCollection.findOne({_id:new ObjectId(user_id)}) as unknown as User  ;
    if(user){
        const email = user.email ;
        const name = user.name;
        // todo (add the link to the project from the frontend)
        const subject = 'You have received a new Proposal ';
        const html = `
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
              <h1>New proposal submitted for your project!</h1>
              <p>Dear ${name},</p>
              <p>We hope this email finds you well. We wanted to let you know that a freelancer has submitted a proposal for your project.</p>
              <p>You can review the proposal by logging into your account and going to the project page.</p>
              <p>If you have any questions or concerns about the proposal or the project, please don't hesitate to <a href="[Contact link]">contact us</a>.</p>
              <p>Thanks for using our platform!</p>
              <p class="signature">Sincerely,<br>The Bricoll Team</p>
            </div>
          </body>
        </html>
        
        `;
        await emailService.sendEmail({to:email,subject,html});
    }
}
async function OnProposalAccepted(user_id:ObjectId){
    const user = await usersCollection.findOne({_id:new ObjectId(user_id)}) as unknown as User  ;
    if(user){
        const email = user.email ;
        const name = user.name;
        // todo (add the link to the project from the frontend)
        const subject = 'Your proposal has been accepted ';
        const html = `
        <!DOCTYPE html>
        <html lang="lang">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Your proposal has been accepted</title>
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
              <h1>Your proposal has been accepted!</h1>
              <p>Dear ${name},</p>
              <p>We hope this email finds you well. We wanted to let you know that a your proposal has been accepted. ✅</p>
              <p>If you have any questions or concerns about the proposal or the project, please don't hesitate to <a href="[Contact link]">contact us</a>.</p>
              <p>Thanks for using our platform!</p>
              <p class="signature">Sincerely,<br>The Bricoll Team</p>
            </div>
          </body>
        </html>
        `;
        await emailService.sendEmail({to:email,subject,html});
    }
}
async function OnProposalDeclined(user_id:ObjectId){
    const user = await usersCollection.findOne({_id:new ObjectId(user_id)}) as unknown as User  ;
    if(user){
        const email = user.email ;
        const name = user.name;
        // todo (add the link to the project from the frontend)
        const subject = 'Sorry your proposal has been declined ';
        const html = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Your proposal has been declined</title>
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
              <h1>Your proposal has been accepted!</h1>
              <p>Dear ${name},</p>
              <p>We hope this email finds you well. We wanted to let you know that a your proposal has been declined.</p>
              <p>If you have any questions or concerns about the proposal or the project, please don't hesitate to <a href="[Contact link]">contact us</a>.</p>
              <p>Thanks for using our platform!</p>
              <p class="signature">Sincerely,<br>The Bricoll Team</p>
            </div>
          </body>
        </html>
        `;
        await emailService.sendEmail({to:email,subject,html});
    }
}
async function OnProposalWithDrawn(user_id:ObjectId){
    const user = await usersCollection.findOne({_id:new ObjectId(user_id)}) as unknown as User  ;
    if(user){
        const email = user.email ;
        const name = user.name;
        // todo (add the link to the project from the frontend)
        const subject = 'Sorry your proposal has been withdrawn by the freelancer  ';
        const html = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Your proposal has been declined</title>
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
              <h1>Your proposal has been accepted!</h1>
              <p>Dear ${name},</p>
              <p>We hope this email finds you well. We wanted to let you know that a your proposal has been declined.</p>
              <p>If you have any questions or concerns about the proposal or the project, please don't hesitate to <a href="[Contact link]">contact us</a>.</p>
              <p>Thanks for using our platform!</p>
              <p class="signature">Sincerely,<br>The Bricoll Team</p>
            </div>
          </body>
        </html>
        `;
        await emailService.sendEmail({to:email,subject,html});
    }
}

async function OnProposalChange(user_id:ObjectId){
    const user = await usersCollection.findOne({_id:new ObjectId(user_id)}) as unknown as User  ;
    if(user){
        const email = user.email ;
        const name = user.name;
        // todo (add the link to the project from the frontend)
        const subject = 'Your proposal terms has been changed ';
        const html = `<h1>Hello ${name} , your proposal has been changed , click me for more details , a button and more bla bla bla </h1>
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Your proposal has been changed</title>
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
              <h1>Your proposal has been changed!</h1>
              <p>Dear ${name},</p>
              <p>We hope this email finds you well. We wanted to let you know that a your proposal has been changed.</p>
              <p>If you have any questions or concerns about the proposal or the project, please don't hesitate to <a href="[Contact link]">contact us</a>.</p>
              <p>Thanks for using our platform!</p>
              <p class="signature">Sincerely,<br>The Bricoll Team</p>
            </div>
          </body>
        </html>
        `;
        await emailService.sendEmail({to:email,subject,html});
    }
}

async function OnPaymentReceive(user_id:ObjectId){

}

export {OnNewProposal,OnProposalAccepted,OnProposalDeclined,OnProposalWithDrawn,OnProposalChange};