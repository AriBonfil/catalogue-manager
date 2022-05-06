import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Sender extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://${context.account}.vtexcommercestable.com.br`,
      context,
      {
        ...(options ?? {}),
        headers: {
          ...(options?.headers ?? {}),
          'Content-Type': 'application/json',
          'VtexIdclientAutCookie': context.adminUserAuthToken || context.authToken,
        },
      }
    )
  }

  public async test(): Promise<any> {
    console.log("TEST OK");
    return
    /* var config = {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*',}};
    return await this.http.delete(`api/catalog/pvt/collection/${id}`, config); */
  }
}
