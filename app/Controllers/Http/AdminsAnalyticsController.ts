import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subscription from 'App/Models/Subscription'
import Admin from 'App/Models/Admin'
import Coach from 'App/Models/Coach'
import Client from 'App/Models/Client'
import Coaching from 'App/Models/Coaching'

export default class AdminsAnalyticsController {
  public async index({ response }: HttpContextContract) {
    const subscriptions = await Subscription.query().withScopes((scopes) => scopes.currentYear())

    const clients = await Client.query().withScopes((scopes) => scopes.currentYear())

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
      const month = subscription.startAt?.month

      if (month) data.subscriptionValues[month] += 1
    })

    clients.forEach((client) => {
      const month = client.createdAt?.month

      if (month) data.clientValues[month] += 1
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
