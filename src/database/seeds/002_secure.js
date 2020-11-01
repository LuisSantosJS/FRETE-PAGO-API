exports.seed = function (knex) {
    return knex('secure').insert([
        {
            active: 'true'
        }
    ])
}