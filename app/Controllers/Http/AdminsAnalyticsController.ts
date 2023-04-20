import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subscription from 'App/Models/Subscription'
import Database from '@ioc:Adonis/Lucid/Database'
import Admin from 'App/Models/Admin'
import Coach from 'App/Models/Coach'
import Client from 'App/Models/Client'

export default class AdminsAalyticsController {
  public async index({ response }: HttpContextContract) {
    // Dito ka mag code ng analytics boy
    const subscriptions = await Subscription.query()
      .select(Database.raw('MONTH(created_at) as month'), Database.raw('COUNT(*) as count'))
      .where('status', 'active')
      .groupBy('month')
      .orderBy('month')
      .scope('currentYear')

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
      data: Array(12).fill(0),
    }

    subscriptions.forEach((subscription) => {
      const index = subscription.month - 1
      data.data[index] = subscription.count
    })

    return response.json({ data })
  }
  public async count({ response }: HttpContextContract) {
    const clientsCount = await Client.query().count('* as count')
    const coachesCount = await Coach.query().count('* as count')
    const adminCount = await Admin.query().count('* as count')

    return response.ok({
      clients: clientsCount[0].count,
      coaches: coachesCount[0].count,
      admin: adminCount[0].count,
    })
  }
}
