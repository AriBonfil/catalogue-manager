import { json } from 'co-body'
import { IUpdateSpecifications } from '../interfaces'
export async function sendData(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { sender },
  } = ctx
  const body: any = await json(ctx.req)
  let log :Array<Object> = []
  if (body.data.length > 0) {
    body.data.forEach((i: any) => {
      console.log("keys", Object.keys(i))
      // Falta Logica para machear las keys y obtener los valores para el nuevo object
      let newSpecifications: IUpdateSpecifications = {
        id: 123,
        skuId: 1,
        fieldId: 321,
        fieldValueId: 1,
        text: 'value',
      }
      let res = sender.updateSkuSpecification(newSpecifications)
      log.push(res)
    })
  }
  ctx.status = 200
  ctx.set('cache-control', 'no-cache')
  ctx.body = log
  await next()
}

