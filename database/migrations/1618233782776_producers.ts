import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Producers extends BaseSchema {
  protected tableName = 'producers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('cpf').nullable()
      table.string('cnpj').nullable()
      table.string('producer_name').notNullable()
      table.string('farm_name').notNullable()
      table.string('city').notNullable()
      table.string('state').notNullable()
      table.integer('total_area').notNullable()
      table.integer('arable_area').notNullable()
      table.integer('vegetation_area').notNullable()
      table.string('cultures').notNullable()
      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
