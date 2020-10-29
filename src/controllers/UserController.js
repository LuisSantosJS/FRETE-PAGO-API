
const knex = require('../database/connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const ValidateToken = require('../jwt/validate');
module.exports = {
    async index(request, response) {
        const users = await knex('users').select('*').orderBy('id', 'desc');
        return response.json(users);
    },
    async valid(request, response) {
        const { code, hash, token } = request.body;
        // const value = ValidateToken(token, 'secreto');
       // console.log('result', value)
        response.json({mes:'a'})
    },
    async create(request, response) {

    },

    async updateUser(request, response) {

    },
    async login(request, response) {

    }

}





