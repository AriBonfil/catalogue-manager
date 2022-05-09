import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'
import {INewSpecification} from '../interfaces'
export default class Specification extends ExternalClient {
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


  public async createSpecification(newSpecification: INewSpecification): Promise<any> {
    var config = {
      body: newSpecification,
      headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*',}
    };
    return await this.http.post(`/api/catalog/pvt/specification`, config);
  }
}
