import { json } from 'co-body'
import { /* ILog */ /* INewSpecification */ } from '../interfaces'
export async function sendData(ctx: Context, next: () => Promise<any>) {
  const body: any = await json(ctx.req)
  let { specifications, images} = parseBody(body)
  let logSpecifications = await associateProduct(specifications, ctx)
  let logImages = await associateProductImage(images, ctx)
  console.log("kig images", logImages)
  ctx.body= {logSpec: logSpecifications, logImages: logImages}
  ctx.status = 200
  ctx.set('cache-control', 'no-cache')
  await next()
}
const parseBody = (body: any) => {
  var bodyObj = Object.keys(body).map(function (key) {
    return [Number(key), body[key]]
  })

  let specifications: Array<any> = []
  let images: Array<any> = []
  bodyObj[0][1].forEach((s: any) => {
    specifications.push(s)
  })
  bodyObj[1][1].forEach((s: any) => {
    images.push(s)
  })

  return { specifications, images }
}

function searchValueByImpartialKey(nameKey: any, obj: any) {
  if (obj.hasOwnProperty(nameKey)) {
    return obj[nameKey]
  } else {
    var res = Object.keys(obj).filter(function (k) {
      return (
        k.toLowerCase().indexOf(nameKey.toLowerCase()) > -1 ||
        nameKey.toLowerCase().indexOf(k.toLowerCase()) > -1
      )
    })
    return res ? obj[res[0]] : false
  }
}

const associateProduct = async (specifications: any, ctx: any) => {
  const {
    clients: { specification },
  } = ctx
  if(specifications.length > 0) {
   return await Promise.all(
      specifications.map(async (spec: any) => {
        let skuId = parseFloat(searchValueByImpartialKey('_ProductId', spec))
        let fieldId = searchValueByImpartialKey('FieldId', spec)
        let text = searchValueByImpartialKey('SpecificationValue', spec)
        let reqBody: any = {
            Id: parseFloat(fieldId),
            Value: text,
        }
        return await specification.associateProductSpecification(skuId, reqBody)
            .then((response: any) => {
              return response
            })
            .catch((error: any) => {
              return error
            })
          })
   )
  }
  return
}

const associateProductImage = async (images: any, ctx: any) => {
  const {
    clients: { specification },
  } = ctx
  if(images.length > 0) {
   return await Promise.all(
    images.map(async (i: any) => {
        let skuId = parseFloat(searchValueByImpartialKey('IdSku', i))
        let imageUrl = searchValueByImpartialKey('URL', i)
        /* let imageName = searchValueByImpartialKey('NomeImagem', i) */
        let imageText = searchValueByImpartialKey('TextoImagem', i)
        let reqBody: any = {
            imageName: imageText,
            imageUrl: imageUrl
        }
        return await specification.associateProductImage(skuId, reqBody)
            .then((response: any) => {
              return response
            })
            .catch((error: any) => {
              return error
            })
          })
   )
  }
  return
}
