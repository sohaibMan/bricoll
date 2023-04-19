import {ObjectId} from "mongodb";
import db from "../../lib/mongodb";
import emailService from "../../lib/email";
import {User} from "../../types/resolvers";

const usersCollection = db.collection("users")

async function OnNewProposal(user_id:ObjectId){
    const user = await usersCollection.findOne({_id:new ObjectId(user_id)}) as unknown as User  ;
    if(user){
        const email = user.email ;
        const name = user.name;
        // todo (add the link to the project from the frontend)
        const subject = 'You have received a new Proposal ';
        const html = `<h1>Hello ${name} , you have a new proposal , click me for more details , a button and more bla bla bla </h1>`;
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
        const html = `<h1>Hello ${name} , your proposal has been accepted , click me for more details , a button and more bla bla bla </h1>`;
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
        const html = `<h1>Hello ${name} , your proposal has been declined , click me for more details , a button and more bla bla bla </h1>`;
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
        const html = `<h1>Hello ${name} , your proposal has been declined , click me for more details , a button and more bla bla bla </h1>`;
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
        const html = `<h1>Hello ${name} , your proposal has been changed , click me for more details , a button and more bla bla bla </h1>`;
        await emailService.sendEmail({to:email,subject,html});
    }
}

export {OnNewProposal,OnProposalAccepted,OnProposalDeclined,OnProposalWithDrawn,OnProposalChange};