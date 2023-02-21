import Model from 'App/Core/Models/Model'
import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Client from 'App/Models/Client'
import currency from 'currency.js'
import SubscriptionProduct from 'App/Models/SubscriptionProduct'

export default class Subscription extends Model {
  @column.dateTime()
  public startAt?: DateTime

  @column.dateTime()
  public endAt?: DateTime

  @column.dateTime()
  public paymentDate?: DateTime

  @column()
  public paymentReceived?: string

  public get payment() {
    return this.paymentReceived ? currency(this.paymentReceived) : undefined
  }

  public set payment(price) {
    this.paymentReceived = price?.toString()
  }

  @column()
  public clientId: number

  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>

  @column()
  public subscriptionProductId: number

  @belongsTo(() => SubscriptionProduct)
  public subscriptionProduct: BelongsTo<typeof SubscriptionProduct>

  public isActive() {
    if (!this.startAt || !this.endAt) return false

    const today = DateTime.now()
    return this.startAt <= today && today <= this.endAt
  }
}
