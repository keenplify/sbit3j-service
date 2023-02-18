import { column } from '@ioc:Adonis/Lucid/Orm'
import Model from 'App/Core/Models/Model'
import currency from 'currency.js'
import { Duration } from 'luxon'

export default class SubscriptionProduct extends Model {
  @column()
  public title: string

  @column()
  public description: string

  @column()
  public priceString: string

  public get price() {
    return currency(this.priceString)
  }

  public set price(price) {
    this.priceString = price.toString()
  }

  @column({ columnName: 'duration_ISO' })
  public durationISO: string

  public get duration() {
    return Duration.fromISO(this.durationISO)
  }

  public set duration(duration) {
    this.durationISO = duration.toISO()
  }
}