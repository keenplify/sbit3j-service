declare module '@ioc:Adonis/Core/Response' {
  interface ResponseContract {
    resource(resource: any, code?: number): void
  }
}
