
const knex = require('../database/connection');
const ValidateToken = require('../jwt/validate');
const KeySecret = 'secreto';
module.exports = {
    async index(req, res) {
        const secureResult = await knex('secure').where('id', 1).select('secure.active');
        res.status(200).json({ message: 'success', value: secureResult[0].active})
    },
    async update(req, res) {
        const token = req.headers['x-access-token'];
        const value = ValidateToken(token, KeySecret).message;
        if (value === 'error') {
            return res.json({ message: 'error', res: 'Failed to authenticate' })
        }
        const io = req.app.io;
        const { active } = req.body;
        if (!active) {
            return res.status(200).json({ message: 'error', res: 'Missing the active' })
        }
        knex('secure').where('id', 1).update({
            active: String(active)
        }).then(() => {
            io.emit('app_status_isBlocked', `${active}`);
            return res.status(200).json({ message: 'success' })
        }).catch(() => {
            return res.status(200).json({ message: 'error' });
        })
    }
}