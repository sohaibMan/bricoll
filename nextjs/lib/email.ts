import sgMail from "@sendgrid/mail";

if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_EMAIL_FROM) {
    throw new Error('Invalid/Missing environment variable: "SENDGRID_API_KEY"');
}

class EmailService {
    private static  instance:EmailService;
    private constructor() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    }

    public sendEmail({to, subject, html}:{to:string,subject:string,html:string}) {
        return sgMail.send({
            to,
            from:process.env.SENDGRID_EMAIL_FROM,
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