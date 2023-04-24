import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subscription from 'App/Models/Subscription'
import Database from '@ioc:Adonis/Lucid/Database'
import Admin from 'App/Models/Admin'
import Coach from 'App/Models/Coach'
import Client from 'App/Models/Client'
import Coaching from 'App/Models/Coaching'

export default class AdminsAnalyticsController {
  public async index({ response }: HttpContextContract) {
    const subscriptions = await Subscription.query()
      .select(Database.raw('MONTH(created_at) as month'), Database.raw('COUNT(*) as count'))
      .groupBy('month')
      .orderBy('month')
      .withScopes((scopes) => scopes.currentYear())

    const clients = await Client.query()
      .select(Database.raw('MONTH(created_at) as month'), Database.raw('COUNT(*) as count'))
      .groupBy('month')
      .orderBy('month')
      .withScopes((scopes) => scopes.currentYear())

    const clientsCount = await Client.query().count('* as count')
    const coachesCount = await Coach.query().count('* as count')
    const adminCount = await Admin.query().count('* as count')
    const coachingsCount = await Coaching.query().count('* as count')

    const labels = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    const data = {
      labels: labels,
      subscriptionValues: Array(12).fill(0),
      clientValues: Array(12).fill(0),
    }

    subscriptions.forEach((subscription) => {
      const index = subscription.$extras.month - 1
      data.subscriptionValues[index] = subscription.$extras.month
    })

    clients.forEach((client) => {
      const index = client.$extras.month - 1
      data.clientValues[index] = client.$extras.month
    })

    return response.json({
      data,
      clients: clientsCount[0].$extras.count,
      coaches: coachesCount[0].$extras.count,
      admin: adminCount[0].$extras.count,
      coaching: coachingsCount[0].$extras.count,
    })
  }
}
