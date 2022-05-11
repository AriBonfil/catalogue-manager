import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'
import {ILog} from '../interfaces'
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
      let data = [
        {
            "Value": [
              `${reqBody.Value}`
            ],
            "Id": reqBody.Id
        },
    ]
    let logItem :ILog = {}
    try {
      await this.http.post(`/api/catalog_system/pvt/products/${skuId}/specification`, JSON.stringify(data));
       logItem = {
        "skuId": skuId,
        "specificationId": reqBody.Id,
        "success": true,
        "message": `El valor ${reqBody.Value} para la especificacion ${reqBody.Id} del Sku Id ${skuId} se actualizo correctamente`
      }
    } catch (error) {
      console.log("error de la api vtex", error)
      logItem = {
        "skuId": skuId,
        "specificationId": reqBody.Id,
        "success": false,
        "message": "Algo salio mal"
      }
    }
    return logItem
  }
}
