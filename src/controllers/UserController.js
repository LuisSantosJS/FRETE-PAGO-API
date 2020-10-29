
const knex = require('../database/connection');
const bcrypt = require('bcryptjs');
const ValidateToken = require('../jwt/validate');
const CreateToken = require('../jwt/create');

const KeySecret = 'secreto';
const KeySecretExpire = 'aqueletokenqueexpira'
module.exports = {
    async index(req, res) {
        const token = req.headers['x-access-token'];
        const value = ValidateToken(token, KeySecret).message;
        if (value === 'error') {
            return res.json({ message: 'error', res: 'Failed to authenticate' })
        }
        const users = await knex('users').select('*').orderBy('id', 'desc');
        return res.json(users);
    },
    async valid(req, res) {
        const { code, hash, email } = req.body;

        const valueBcrypt = bcrypt.compareSync(String(code).toLowerCase(), hash);
        if (valueBcrypt == false) {
            return res.json({ message: 'error', res: 'Invalid code' })
        }
        const value = CreateToken(email, KeySecretExpire, 7200);
        if (value.message == 'error') {
            return res.json({ message: 'error', res: 'Failed to create token' })
        }
        return res.json({ message: 'success', token: value.token, expire: value.expire })
    },
    async create(req, res) {
        const token = req.headers['x-access-token'];
        const { email, senha } = req.body;
        if (!email) {
            return res.json({ message: 'error', res: 'Missing the email' })
        }
        if (!token) {
            return res.json({ message: 'error', res: 'Missing the token' })
        }
        if (!senha) {
            return res.json({ message: 'error', res: 'Missing the password' })
        }
        const value = ValidateToken(token, KeySecretExpire).message;
        if (value === 'error') {
            return res.json({ message: 'error', res: 'Failed to authenticate' })
        }

        ///create user
        return res.json({ message: 'success', res: '' })
    },

    async login(req, res) {
        const { email, senha } = req.body;
        ///validate


        return;

    }
}





