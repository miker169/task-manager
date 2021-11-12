const sgMail = require('@sendgrid/mail')
const sendGridApiKey=process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendGridApiKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'miker169@hotmail.co.uk',
        subject: 'Welcome to the App',
        text: `Welcome to the app ${name}. Let us know how you get along with the app`,
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from:'miker169@hotmail.co.uk',
        subject: 'Sorry to hear your leaving',
        text: `Hello ${name} we are sorry to see your leaving , could you tell us what we could do better ?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}
