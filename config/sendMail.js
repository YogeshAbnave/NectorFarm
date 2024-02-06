var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');

exports.sendMail = function(params, callback) {
    var readHTMLFile = function(path, callback) {
        fs.readFile(path, { encoding: 'utf-8' }, function(err, html) {
            if (err) {
                callback(err);
            } else {
                callback(null, html);
            }
        });
    };

    var smtpTransports = nodemailer.createTransport(smtpTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "yogeshabnave101@gmail.com",
            pass: "jgkoxeexowzywosz"
        }
    }));

    readHTMLFile(params.path, function(err, html) {
        let title;
        if (params.emailType == "forgotPassword") {
            title = "NectorFarm - Reset Password";
            var template = handlebars.compile(html);
            var replacements = {
                username: params.username,
                resetlink: process.env.FORGOT_EMAIL_URL + "/resetPassword/" + params.token + "?platform=" + params.platform,
                title: "Reset Password Email",
                message: "A request has been submitted to reset password linked to you account on NectorFarm system. Please click on below link to genertae new password. Ignore if it is not requested by you.",
                set: "Reset"
            };
            var htmlToSend = template(replacements);
        } else if (params.emailType == "verifyUser") {
            title = "NectorFarm - Verify account";
            var template = handlebars.compile(html);
            var replacements = {
                username: params.username,
                code: params.code,
                title: "Verify User Email",
                message: "Welcome to NectorFarm. To activate your account please verify by pasting the code below.",
                set: "Verify"
            };
            var htmlToSend = template(replacements);
        }
        else if (params.emailType == "welcomeEmail") {
            title = "Welcome";
            var template = handlebars.compile(html);
            var replacements = {
                username: params.username,
                bodyMessage: "Welcome to Starter Template",
                title: "Welcome to StarterTeam",
            };
            var htmlToSend = template(replacements);
        }
        else {
            return callback({ success: false, status: 500, message: "Error while sending Email" });
        }
        var mailOptions = {
            from: `${process.env.FROM_NAME}<${process.env.FROM_EMAIL}>`,
            to : params.email,
            subject: title,
            html: htmlToSend
        }

        smtpTransports.sendMail(mailOptions, function(error, response) {
            if (error) {
                console.log("error is", error);
                return callback({ success: false, status: 500, message: "Error while sending mail" });
            } else {
                return callback({ success: true, message: "Mail sent" });
            }
        });
    });

}