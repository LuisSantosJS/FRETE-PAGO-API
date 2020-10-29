
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
module.exports = {
    async emailSend(request, response) {
        const { email } = request.body;
        if (email == null) {
            return response.json({ message: 'not email', error: true })
        }
        var chars = 'acdefhiklmnoqrstuvwxyz0123456789'.split('');
        var result = '';
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * chars.length);
            result += chars[x];
        }
        const code = result;
        const transporter = nodemailer.createTransport({
            host: 'smtp.umbler.com',
            port: 587,
            secure: false,
            auth: {
              user: 'luis@roxytech.com.br',
              pass: '45R6XfZx29!'
            }
        });
        const options = {
            from: 'luis@roxytech.com.br',
            to: `${email}`,
            subject: 'CÃ³digo de acesso',
            text: `cÃ³digo ${code.toUpperCase()}`
        };
        transporter.sendMail(options, function (error, info) {
            if (error) {
                return response.json({ message: error, error: true })
            } else {
                bcrypt.hash(code.toLowerCase(), 10, function (err, hash) {
                    if (err == null) {
                        return response.json({
                            message: info.response,
                            code: hash,
                            error: false
                        });
                    } else {
                        return response.json({ message: error, error: true });
                    }
                });
            }
        });
    },
}


