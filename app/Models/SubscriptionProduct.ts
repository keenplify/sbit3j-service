import { column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Model from 'App/Core/Models/Model'
import Subscription from 'App/Models/Subscription'
import currency from 'currency.js'
import { Duration } from 'luxon'

export default class SubscriptionProduct extends Model {
  @column()
  public title: string

  @column({
    columnName: 'description_JSON',
  })
  public descriptionJSON: string | null

  public get description(): string[] | null {
    if (!this.descriptionJSON) return null
    return JSON.parse(this.descriptionJSON)
  }

  public set description(values: string[] | null) {
    this.descriptionJSON = values ? JSON.stringify(values) : null
  }

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

  @hasMany(() => Subscription)
  public subscriptions: HasMany<typeof Subscription>
}
