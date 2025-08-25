import nodemailer from 'nodemailer';
import User from '@/models/user.model';
import bcryptjs from 'bcryptjs';



export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {

        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "Verify") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        }
        else {
            await User.findByIdAndUpdate(userId, {
                forgetPasswordToken: hashedToken,
                forgetPasswordTokenExpiry: Date.now() + 3600000
            })
        }

        // go to mailtrap for this part of code
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER ,
                pass: process.env.MAILTRAP_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,//put your email here
            to: email,
            subject: emailType === "Verify" ? "verify your email" : "reset your password",
            html: `<p>Click <a href="${process.env.domain}/verifyEmail?token=${hashedToken}">here</a> to ${emailType === "Verify" ? "verify your email" : "reset your password"}.</p>
<p>${process.env.domain}/verifyEmail?token=${hashedToken}</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error: any) {
        console.log(error.message);
        throw new Error(error.message);
    }
}
