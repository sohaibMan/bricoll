import sgMail from "@sendgrid/mail";

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

class EmailService {
    private static  instance:EmailService;
    private constructor() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    }

    public sendEmail({to, from, subject, html}:{to:string,from:string,subject:string,html:string}) {
        return sgMail.send({
            to,
            from,
            subject,
            html
        });

    }
    static getInstance(){
        if(!this.instance)this.instance=new EmailService()
        return this.instance;
    }
}

const emailService=EmailService.getInstance();
export default emailService;