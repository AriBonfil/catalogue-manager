import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'
import { ILog } from '../interfaces'

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

  public async associateProductSpecification(
    skuId: Number,
    reqBody: any
  ): Promise<any> {
    let data = [
      {
        Value: [`${reqBody.Value}`],
        Id: reqBody.Id,
      },
    ]
    let logItem: ILog = {}
    try {
      await this.http.post(
        `/api/catalog_system/pvt/products/${skuId}/specification`,
        JSON.stringify(data)
      )
      logItem = {
        skuId: skuId,
        specificationId: reqBody.Id,
        success: true,
        message: `El valor ${reqBody.Value} para la especificacion ${reqBody.Id} del Sku Id ${skuId} se actualizo correctamente`,
      }
    } catch (error) {
      logItem = {
        skuId: skuId,
        specificationId: reqBody.Id,
        success: false,
        message: error.response.data,
      }
    }
    return logItem
  }

  public async associateProductImage(
    skuId: Number,
    reqBody: any
  ): Promise<any> {
    let dataPost = {
      skuId: skuId,
      Name: reqBody.imageName,
      Url: reqBody.imageUrl,
    }

    let logItem: any = {}

    try {
      await this.http
        .get(`/api/catalog/pvt/stockkeepingunit/${skuId}/file`)
        .then((response: any[]) => {
          if (response) {
            let imageExist = response.find((i) => i.Name === reqBody.imageName)
            if (!imageExist) {
              try {
                this.http.post(
                  `/api/catalog/pvt/stockkeepingunit/${skuId}/file`,
                  dataPost
                )
                logItem = {
                  skuId: skuId,
                  imageName: reqBody.imageName,
                  imageUrl: reqBody.imageUrl,
                  success: true,
                  message: `La imagen ${reqBody.imageName} de url ${reqBody.imageUrl} del Sku Id ${skuId} se agrego correctamente`,
                }
              } catch (error) {
                console.log('errorr', error)
                logItem = {
                  skuId: skuId,
                  imageName: reqBody.imageName,
                  imageUrl: reqBody.imageUrl,
                  success: false,
                  message: error.response.data.Message,
                }
              }
            } else {
              try {
                this.http.delete(
                  `/api/catalog/pvt/stockkeepingunit/${skuId}/file/${imageExist.Id}`
                )
                this.http.post(
                  `/api/catalog/pvt/stockkeepingunit/${skuId}/file`,
                  dataPost
                )
                logItem = {
                  skuId: skuId,
                  imageName: reqBody.imageName,
                  imageUrl: reqBody.imageUrl,
                  success: true,
                  message: `La imagen ${reqBody.imageName} de url ${reqBody.imageUrl} del Sku Id ${skuId} se actualizo correctamente`,
                }
              } catch (error) {
                console.log('errorr', error)
                logItem = {
                  skuId: skuId,
                  imageName: reqBody.imageName,
                  imageUrl: reqBody.imageUrl,
                  success: false,
                  message: error.response.data.Message,
                }
              }
            }
          }
        })
    } catch (error) {
      console.log('errror', error)
    }
    return logItem
  }
}
