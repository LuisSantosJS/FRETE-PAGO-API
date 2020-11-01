
exports.up = async (knex) => {
    return knex.schema.createTable('secure', table => {
        table.increments('id').primary().unique();
        table.string('active', 255).notNullable();
    });

}
exports.down = async (knex) => {
    return knex.schema.dropTable('secure');
}