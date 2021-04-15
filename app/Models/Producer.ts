import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

export default class Producer extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public cpf: string

  @column()
  public cnpj: string

  @column()
  public producerName: string

  @column()
  public farmName: string

  @column()
  public city: string

  @column()
  public state: string

  @column()
  public totalArea: number

  @column()
  public arableArea: string

  @column()
  public vegetationArea: string

  @column()
  public cultures: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(producer: Producer) {
    producer.id = uuid()
  }
}
