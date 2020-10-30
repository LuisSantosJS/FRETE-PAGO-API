
exports.up = async (knex) => {
    return knex.schema.createTable('usersTruck', table => {
        table.increments('id').primary().unique();
        table.string('name', 255).notNullable();
        table.string('email', 255).notNullable();
        table.string('password', 255).notNullable();
        table.string('telefone', 255).notNullable();
        table.string('CPF', 255).notNullable();
        table.string('dateOfBirth', 255).notNullable();
        table.string('BankNumber', 255).notNullable();
        table.string('typeBank', 255).notNullable();
        table.string('agency', 255).notNullable();
        table.string('account', 255).notNullable();
        table.string('nameAccount', 255).notNullable();
        table.string('accountCPF', 255).notNullable();
        table.string('vehicleModel', 255).notNullable();
        table.string('vehiclePlate', 255).notNullable();
        table.string('numberRNTRC', 255).notNullable();
        table.string('bodywork', 255).notNullable();
        table.string('bodyworkType', 255).notNullable();
        table.string('numberCNH', 255).notNullable();
        table.string('status', 255).notNullable();
        table.timestamps(true, true);
    });
}

exports.down = async (knex) => {
    return knex.schema.dropTable('usersTruck');
}