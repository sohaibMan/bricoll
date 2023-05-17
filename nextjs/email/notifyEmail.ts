import {ObjectId} from "mongodb";
import emailService from "../lib/email";
import {getUserById, htmlMarkupGenerator} from "./emailHelpers";


async function OnCreateProposal(client_id: ObjectId) {
    const user = await getUserById(client_id);
    const email = user.email;
    const username = user.username;
    // todo (create the link to the project from the frontend)
    const subject = 'You have received a new Proposal ';
    const html = `
              <h1>New proposal submitted for your project!</h1>
              <p>Dear ${username},</p>
        `;
    await emailService.sendEmail({to: email, subject, html: htmlMarkupGenerator(html)});
}

async function OnAcceptProposal(freelancer_id: ObjectId) {
    const user = await getUserById(freelancer_id);
    const email = user.email;
    const username = user.username;
    // todo (create the link to the project from the frontend)
    const subject = 'Your proposals has been accepted ';
    const html = `
              <h1>Your proposal has been accepted!</h1>
              <p>Dear ${username},</p>
        `;
    await emailService.sendEmail({to: email, subject, html: htmlMarkupGenerator(html)});
}

async function OnCancelProposal(freelancer_id: ObjectId) {
    const user = await getUserById(freelancer_id);
    const email = user.email;
    const username = user.username;
    // todo (create the link to the project from the frontend)
    const subject = 'Sorry your proposals has been declined ';
    const html = `
              <h1>Your proposal has been declined!</h1>
              <p>Dear ${username},</p>
        `;
    await emailService.sendEmail({to: email, subject, html: htmlMarkupGenerator(html)});
}

async function OnProposalDeclined(client_id: ObjectId) {

    const user = await getUserById(client_id);
    const email = user.email;
    const username = user.username;
    // todo (create the link to the project from the frontend)
    const subject = 'Sorry your proposals has been withdrawn by the freelancer  ';
    const html = `
      
              <h1>Sorry Your proposal has been withdrawn by the freelancer!</h1>
              <p>Dear ${username},</p>
              
        `;
    await emailService.sendEmail({to: email, subject, html: htmlMarkupGenerator(html)});

}

async function OnEditProposal(client_id: ObjectId) {
    const user = await getUserById(client_id);
    const email = user.email;
    const username = user.username;
    // todo (create the link to the project from the frontend)
    const subject = 'Your proposals terms has been changed ';
    const html = `
              <h1>Your proposal has been changed! check the website for more details</h1>
              <p>Dear ${username},</p>
        `
    await emailService.sendEmail({to: email, subject, html: htmlMarkupGenerator(html)});

}

async function OnPaymentReceive(freelancer_id: ObjectId, contract_id: string, amount: number) {
    const user = await getUserById(freelancer_id);
    const email = user.email;
    const username = user.username;
    // todo (create the link to the project from the frontend)
    const subject = 'Your proposals terms has been changed ';
    const html = `
              <h1>you have recive a payment check your earning and your bank account</h1>
                <p>you have recive a payment of ${amount} for the contract ${contract_id}</p>
              <p>Dear ${username},</p>
        `
    await emailService.sendEmail({to: email, subject, html: htmlMarkupGenerator(html)});

}

async function onAcceptContract(client_id: ObjectId) {
    // send to client
    const client = await getUserById(client_id);
    const clientEmail = client.email;
    const clientName = client.username;
    const subject = 'Your contract has been accepted ';
    const html = `
        <h1>Your contract has been accepted! check the website for more details</h1>
        <p>Dear ${clientName},</p>
    `
    await emailService.sendEmail({to: clientEmail, subject, html: htmlMarkupGenerator(html)});

}

async function onCancelContract(client_id: ObjectId) {
    // send to client
    const client = await getUserById(client_id);
    const clientEmail = client.email;
    const clientName = client.username;
    const subject = 'Your contract has been declined ';
    const html = `
        <h1>Your contract has been declined! check the website for more details</h1>
        <p>Dear ${clientName},</p>
    `
    await emailService.sendEmail({to: clientEmail, subject, html: htmlMarkupGenerator(html)});
}

async function onCreateContract(freelancer_id: ObjectId) {
    const freelancer = await getUserById(freelancer_id);
    const freelancerEmail = freelancer.email;
    const freelancerName = freelancer.username;
    const subject = 'You have received a new contract ';
    const html = `
        <h1>You have received a new contract! check the website for more details</h1>
        <p>Dear ${freelancerName},</p>
    `
    await emailService.sendEmail({to: freelancerEmail, subject, html: htmlMarkupGenerator(html)});

}

async function onRequestProjectSubmissionReview(client_id: ObjectId) {
    const client = await getUserById(client_id);
    const clientEmail = client.email;
    const clientName = client.username;
    const subject = 'new  request project submission review  ';
    const html = `
        <h1>you have recieve a new  request project submission review  from your freelancer check the website for more details</h1>
        <p>Dear ${clientName},</p>
    `
    await emailService.sendEmail({to: clientEmail, subject, html: htmlMarkupGenerator(html)});
}

async function onAcceptRequestProjectSubmissionReview(freelancer_id: ObjectId) {
    const freelancer = await getUserById(freelancer_id);
    const clientEmail = freelancer.email;
    const clientName = freelancer.username;
    const subject = 'congrats you have a new payment ';
    const html = `
        <h1>You have got a new payament check our paltaform for more details</h1>
        <p>Dear ${clientName},</p>
    `
    await emailService.sendEmail({to: clientEmail, subject, html: htmlMarkupGenerator(html)});
}

async function onDeclineRequestProjectSubmissionReview(freelancer_id: ObjectId) {
    const freelancer = await getUserById(freelancer_id);
    const clientEmail = freelancer.email;
    const clientName = freelancer.username;
    const subject = 'sorry but your request of project submission has ben rejected ';
    const html = `
        <p>Dear ${clientName},</p>
        <h1>You have got a new update about your contrat check our paltaform for more details</h1>
    
    `
    await emailService.sendEmail({to: clientEmail, subject, html: htmlMarkupGenerator(html)});
}

async function sendEmailVerification(email: string, username: string, emailVerificationLink: string) {
    await emailService.sendEmail({
        to: `${email}`,
        subject: "Complete your sign-up: Verify your Bricoll account",
        html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Welcome to Bricoll</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.5;
              color: #333;
            }
            p {
              margin-bottom: 20px;
            }
            a {
              display: inline-block;
              padding: 10px 20px;
              background-color: #e8eaed87;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
              transition: all 0.2s ease;
            }
          
            .signature {
              margin-top: 50px;
              font-style: italic;
              color: #777;
            }
          </style>
        </head>
        <body>
          <p>Dear ${username},</p>
          <p>Thank you for signing up for our service! To verify your account and start using our platform, please click the link below:</p>
          <p><a href="${emailVerificationLink}">Verify my account</a></p>
          <p>If you did not sign up for our platform, please disregard this email.</p>
          <p>Thanks again for choosing our service!</p>
          <p class="signature">Sincerely,<br>The Bricoll Team</p>
        </body>
      </html>
    `
    });
}


export {
    OnCreateProposal,
    OnAcceptProposal,
    OnCancelProposal,
    OnProposalDeclined,
    OnEditProposal,
    OnPaymentReceive,
    onCreateContract,
    onAcceptContract,
    onCancelContract,
    onRequestProjectSubmissionReview,
    onAcceptRequestProjectSubmissionReview,
    onDeclineRequestProjectSubmissionReview,
    sendEmailVerification
};
//todo send email on declineRequestProjectSubmissionReview
