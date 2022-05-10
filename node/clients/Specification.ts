import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'
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


  public async associateProductSpecification(skuId : Number, reqBody: any): Promise<any> {
    try {
      let data = [
        {
            "Value": [
              `${reqBody.Text}`
            ],
            "Id": reqBody.FieldId
        },
    ]
      let response = await this.http.post(`/api/catalog_system/pvt/products/${skuId}/specification`, data);
      return response
    } catch (error) {
        return error
    }
  }
}
