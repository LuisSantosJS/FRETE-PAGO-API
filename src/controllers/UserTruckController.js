
const knex = require('../database/connection');
const bcrypt = require('bcryptjs');
const ValidateToken = require('../jwt/validate');
const CreateToken = require('../jwt/create');
const CreateUsersTruck = require('../validateForms/CreateUsersTruck');
const KeySecret = 'secreto';
module.exports = {
    async index(req, res) {
        const token = req.headers['x-access-token'];
        const value = ValidateToken(token, KeySecret).message;
        if (value === 'error') {
            return res.json({ message: 'error', res: 'Failed to authenticate' })
        }
        const users = await knex('usersTruck').select('*').orderBy('id', 'desc');
        return res.json(users);
    },
    async valid(req, res) {
        const { code, hash, email } = req.body;

        const valueBcrypt = bcrypt.compareSync(String(code).toLowerCase(), hash);
        if (valueBcrypt == false) {
            return res.json({ message: 'error', res: 'Invalid code' })
        }
        const value = CreateToken(String(email).toLowerCase(), KeySecret, 7200);
        if (value.message == 'error') {
            return res.json({ message: 'error', res: 'Failed to create token' })
        }
        return res.json({ message: 'success', token: value.token, expire: value.expire })
    },
    async create(req, res) {
        const {
            name,
            email,
            password,
            telefone,
            CPF,
            dateOfBirth,
            bankNumber,
            typeBank,
            agency,
            account,
            nameAccount,
            accountCPF,
            vehicleModel,
            vehiclePlate,
            numberRNTRC,
            bodywork,
            bodyworkType,
            numberCNH
        } = req.body;
        const validationValue = CreateUsersTruck(req.body);
        if (validationValue.message === 'error') {
            return res.json(validationValue);
        }
        const checkUser = await knex('usersTruck').where('email', String(email).toLowerCase()).select('*');
        if (checkUser.length !== 0) {
            return res.status(200).json({ message: 'error', res: 'Account already created or under review | This email has already been registered' })
        }
        const checkUser2 = await knex('usersTruck').where('CPF', String(CPF)).select('*');
        if (checkUser2.length !== 0) {
            return res.status(200).json({ message: 'error', res: 'Account already created or under review | This CPF has already been registered' })
        }
        var salt = bcrypt.genSaltSync(10);
        var hashPassword = bcrypt.hashSync(password, salt);
        knex('usersTruck').insert([{
            name,
            email: String(email).toLowerCase(),
            password: hashPassword,
            telefone,
            CPF,
            dateOfBirth,
            bankNumber,
            typeBank,
            agency,
            account,
            nameAccount,
            accountCPF,
            vehicleModel,
            vehiclePlate,
            numberRNTRC,
            bodywork,
            bodyworkType,
            numberCNH,
            status: 'pending',
        }]).then(() => {
            return res.status(200).json({ message: 'success', res: '' })
        }).catch(() => {
            return res.status(200).json({ message: 'error', res: '' })
        })
    },

    async login(req, res) {
        const { email, password } = req.body;
        if (!email) {
            return res.status(200).json({ message: 'error', res: 'Missing the email' })
        }
        if (!password) {
            return res.status(200).json({ message: 'error', res: 'Missing the password' })
        }
        const checkUser = await knex('usersTruck').where('email', String(email).toLowerCase()).select('*');
        if (checkUser.length === 0) {
            return res.status(200).json({ message: 'error', res: 'Non-existent user' })
        }
        if (String(checkUser[0].status) === 'pending') {
            return res.status(200).json({ message: 'error', res: 'User in evaluation or waiting | Usuário em avaliação ou em espera' })
        }
        const valueVlidPassword = bcrypt.compareSync(password, checkUser[0].password);
        if (!valueVlidPassword) {
            return res.status(200).json({ message: 'error', res: 'Invalid password' })
        }
        const token = CreateToken(String(email).toLowerCase(), KeySecret, 0);
        if (token.message === 'error') {
            return res.status(200).json({ message: 'error', res: token.res })
        }
        return res.status(200).json({ message: 'success', token: token.token, data: checkUser[0] })
    },
    async showStatusUserTruck(req, res) {
        const { email } = req.query;
        if (!email) {
            return { message: 'error', res: 'Missing the email' }
        }
        const userCheck = await knex('usersTruck').where('email', String(email).toLowerCase()).select('usersTruck.status');
        if (userCheck.length === 0) {
            return res.status(200).json({ message: 'error', res: 'Non-existent user' })
        }
        return res.status(200).json({ message: 'success', status: userCheck[0].status })
    },
    async updateStatusUserTruck(req, res) {
        const token = req.headers['x-access-token'];
        const { email, status } = req.body;
        const value = ValidateToken(token, KeySecret).message;
        if (value === 'error') {
            return res.status(200).json({ message: 'error', res: 'Failed to authenticate' })
        }
        if (!status) {
            return res.status(200).json({ message: 'error', res: 'Missing the status' })
        }
        if ((status !== 'pending') && (status !== 'active')) {
            return res.status(200).json({ message: 'error', res: 'Invalid state type! (valid: active, pending)' })
        }
        knex('usersTruck').where('email', String(email).toLowerCase()).update({
            status: String(status)
        }).then(() => {
            return res.status(200).json({ message: 'success', res: `User status changed to ${status}` })
        }).catch((err) => {
            return res.status(200).json({ message: 'error', res: err })
        })
    }
}





