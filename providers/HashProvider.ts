import { HashDriverContract } from '@ioc:Adonis/Core/Hash'
const bcrypt = require('bcrypt')

const saltRounds = 10

export class LaravelHash implements HashDriverContract {
  public async make(value: string) {
    return bcrypt.hashSync(value, saltRounds)
  }

  public async verify(hashedValue: string, plainValue: string) {
    let newHash: string
    if (hashedValue.includes('$2y$10$')) {
      newHash = hashedValue.replace('$2y$10$', '$2a$10$')
    } else {
      newHash = hashedValue
    }
    return await bcrypt.compareSync(plainValue, newHash)
  }
}
