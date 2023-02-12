/**
 * Contract source: https://git.io/JOdz5
 *
 * Feel free to let us know via PR, if you find something broken in this
 * file.
 */

import Admin from 'App/Models/Admin'
import Client from 'App/Models/Client'
import Coach from 'App/Models/Coach'

declare module '@ioc:Adonis/Addons/Auth' {
  /*
  |--------------------------------------------------------------------------
  | Providers
  |--------------------------------------------------------------------------
  |
  | The providers are used to fetch users. The Auth module comes pre-bundled
  | with two providers that are `Lucid` and `Database`. Both uses database
  | to fetch user details.
  |
  | You can also create and register your own custom providers.
  |
  */
  interface ProvidersList {
    /*
    |--------------------------------------------------------------------------
    | User Provider
    |--------------------------------------------------------------------------
    |
    | The following provider uses Lucid models as a driver for fetching user
    | details from the database for authentication.
    |
    | You can create multiple providers using the same underlying driver with
    | different Lucid models.
    |
    */
    admin: {
      implementation: LucidProviderContract<typeof Admin>
      config: LucidProviderConfig<typeof Admin>
    }
    client: {
      implementation: LucidProviderContract<typeof Client>
      config: LucidProviderConfig<typeof Client>
    }
    coach: {
      implementation: LucidProviderContract<typeof Coach>
      config: LucidProviderConfig<typeof Coach>
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Guards
  |--------------------------------------------------------------------------
  |
  | The guards are used for authenticating users using different drivers.
  | The auth module comes with 3 different guards.
  |
  | - SessionGuardContract
  | - BasicAuthGuardContract
  | - OATGuardContract ( Opaque access token )
  |
  | Every guard needs a provider for looking up users from the database.
  |
  */
  interface GuardsList {
    /*
    |--------------------------------------------------------------------------
    | OAT Guard
    |--------------------------------------------------------------------------
    |
    | OAT, stands for (Opaque access tokens) guard uses database backed tokens
    | to authenticate requests.
    |
    */
    admin: {
      implementation: OATGuardContract<'admin', 'admin'>
      config: OATGuardConfig<'admin'>
      client: OATClientContract<'admin'>
    }
    client: {
      implementation: OATGuardContract<'client', 'client'>
      config: OATGuardConfig<'client'>
      client: OATClientContract<'client'>
    }
    coach: {
      implementation: OATGuardContract<'coach', 'coach'>
      config: OATGuardConfig<'coach'>
      client: OATClientContract<'coach'>
    }
  }
}
