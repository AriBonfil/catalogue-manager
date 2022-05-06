import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'
import { IUpdateSpecifications } from '../interfaces'
export default class Sender extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://${context.account}.vtexcommercestable.com.br`, context, {
      ...(options ?? {}),
      headers: {
        ...(options?.headers ?? {}),
        'Content-Type': 'application/json',
        VtexIdclientAutCookie: context.adminUserAuthToken || context.authToken,
      },
    })
  }

  public async updateSkuSpecification(
    newSpecifications: IUpdateSpecifications
  ): Promise<any> {
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: newSpecifications,
    }
    return await this.http.put(
      `/api/catalog/pvt/stockkeepingunit/${newSpecifications.id}/specification`,
      config
    )
  }
}
