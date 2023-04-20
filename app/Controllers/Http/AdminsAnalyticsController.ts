import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subscription from 'App/Models/Subscription'
import Database from '@ioc:Adonis/Lucid/Database'
import Admin from 'App/Models/Admin'
import Coach from 'App/Models/Coach'
import Client from 'App/Models/Client'

export default class AdminsAalyticsController {
  public async index({ response }: HttpContextContract) {
    const subscriptions = await Subscription.query()
      .select(Database.raw('MONTH(created_at) as month'), Database.raw('COUNT(*) as count'))
      .groupBy('month')
      .orderBy('month')
      .withScopes((scopes) => scopes.currentYear())

    const labels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const data = {
      labels: labels,
      values: Array(12).fill(0),
    }

    subscriptions.forEach((subscription) => {
      const index = subscription.$extras.month - 1
      data.values[index] = subscription.$extras.month
    })

    const clientsCount = await Client.query().count('* as count')
    const coachesCount = await Coach.query().count('* as count')
    const adminCount = await Admin.query().count('* as count')

    return response.json({
      data,
      clients: clientsCount[0].$extras.count,
      coaches: coachesCount[0].$extras.count,
      admin: adminCount[0].$extras.count,
    })
  }
}
