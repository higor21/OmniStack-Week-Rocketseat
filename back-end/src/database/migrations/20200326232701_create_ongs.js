
// responsible to migrate/create/update the things
exports.up = function(knex) {
  return knex.schema.createTable('ongs',  function(table) {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable(); // only two digits
  })
};

// responsible to come back if something go wrong
exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
