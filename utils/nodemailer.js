const nodemailer = require("nodemailer")
const ErrorHandler = require("./ErrorHandler")

exports.sendmail=(req,res,next,url)=>{

const transport = nodemailer.createTransport({

    service: "gmail",
    host: "sntp.gmail.com",
    port:465,
    auth:{
        user: process.env.MAIL_EMAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD ,
    }
})
const mailOptions = {
    from: "PRINCE PVT LIMITED",
    to: req.body.email,
    subject: "password reset link",
    // /"text" : "do not share this link to anyone",
    html: `<h1> click link below to reset the password<h1/>
    <a href="${url}">password reset link </a>`
}

 transport.sendMail(mailOptions,(err,info)=>{
 if (err)  return next(new ErrorHandler(err , 500))
console.log(info);
return res.status(300).json({
    message: "mail send successfully",
    url,
})


})

}