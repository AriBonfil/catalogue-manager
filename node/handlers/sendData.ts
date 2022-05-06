import { json } from 'co-body'

import { IUnifiedObject } from '../interfaces'
export async function sendData(ctx: Context, next: () => Promise<any>) {
  const {clients: {sender}} = ctx
  console.log(sender.test())
  const body: any = await json(ctx.req)
  const unifiedData = await dataUnifier(body)
  ctx.status = 200
  ctx.set('cache-control', 'no-cache')
  ctx.body = unifiedData
  await next()
}

async function dataUnifier (body: any) {
  let unifiedObjectCollection : Array<IUnifiedObject> = []
  console.log("HOLAAAAAA?", body)
  if(body.data.length > 0)
  {
    body.data.forEach((i: any) => {
      console.log("i", i)
    })
  }
  console.log(unifiedObjectCollection)
  return body.data
}
