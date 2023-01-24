const express = require('express')
const mailer = require("nodemailer")
const request = require('request')
const app = express()
const PORT = 4000

async function main() {  
    let transporter = mailer.createTransport({
      host: "mail.bawelectric.com",
      port: 587,
      secure: false, 
      auth: {
        user: "", 
        pass: "", 
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    let mailOptions = {
        from: '"Status Web Bawelectric" <test@bawelectric.com>',
        to: "nicolas.harteneck@bawelectric.com, pablo.martinez@bawelectric.com", // list of receivers
        subject: "",
        text: "", 
    }
  
    request('https://bawelectric.com/', function (error, response) {
        if (error) {
            mailOptions.subject = 'Error en el Sitio'
            mailOptions.text = error

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
            })
        } else if(response.statusCode === 200) {
            mailOptions.subject = 'Sitio en Linea'
            mailOptions.text = "Estado HTTPS: 200 , Sitio Funcionado Correctamente"

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
            })
        } else {
            mailOptions.subject = 'Error en el Sitio'
            mailOptions.text = error    

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
            })
        }
    });
}

main().catch(console.error);

app.listen(PORT, () => {
    setInterval(sendEmail, 1000 * 60 * 60 * 6) // Cada 6 Horas Envia Notificacion. 
    console.log(`Server on PORT: ${PORT}`)
})