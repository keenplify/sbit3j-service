declare module '@ioc:Zodios' {
  import { FetchProvider, ZodiosInstance, ZodTypeProvider } from '@zodios/fetch'
  import { allPaymongoAPI } from 'App/Services/PaymongoService'

  const zodiosInstance: ZodiosInstance<typeof allPaymongoAPI, FetchProvider, ZodTypeProvider>

  export default zodiosInstance
}
