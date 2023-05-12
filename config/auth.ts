/**
 * Config source: https://git.io/JY0mp
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */
import Env from '@ioc:Adonis/Core/Env'
import type {
  AuthConfig,
  DatabaseTokenProviderConfig,
  RedisTokenProviderConfig,
} from '@ioc:Adonis/Addons/Auth'

const createProvider = () => {
  const driver = Env.get('AUTH_DRIVER', 'redis')

  switch (driver) {
    case 'database':
      return {
        type: 'api',
        driver: 'database',
        table: 'api_tokens',
        foreignKey: 'auth_id',
      } as DatabaseTokenProviderConfig
    case 'redis':
      return {
        type: 'api',
        driver: 'redis',
        redisConnection: 'default',
        foreignKey: 'auth_id',
      } as RedisTokenProviderConfig
  }
}

/*
|--------------------------------------------------------------------------
| Authentication Mapping
|--------------------------------------------------------------------------
|
| List of available authentication mapping. You must first define them
| inside the `contracts/auth.ts` file before mentioning them here.
|
*/
const authConfig: AuthConfig = {
  guard: 'admin',
  guards: {
    admin: {
      driver: 'oat',
      tokenProvider: createProvider(),
      provider: {
        driver: 'lucid',
        identifierKey: 'id',
        uids: ['email'],
        model: () => import('App/Models/Admin'),
      },
    },
    client: {
      driver: 'oat',
      tokenProvider: createProvider(),
      provider: {
        driver: 'lucid',
        identifierKey: 'id',
        uids: ['email'],
        model: () => import('App/Models/Client'),
      },
    },
    coach: {
      driver: 'oat',
      tokenProvider: createProvider(),
      provider: {
        driver: 'lucid',
        identifierKey: 'id',
        uids: ['email'],
        model: () => import('App/Models/Coach'),
      },
    },
  },
}

export const expiry = Env.get('APP_KEY', '1 day')

export default {
  ...authConfig,
  expiry,
}
