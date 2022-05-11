import { json } from 'co-body'
import { /* ILog */ /* INewSpecification */ } from '../interfaces'
export async function sendData(ctx: Context, next: () => Promise<any>) {
  const body: any = await json(ctx.req)
  let { specifications } = parseBody(body)
  /* let resultLog = createSpecifications(specifications, ctx) */
  let processLog = associateProductSpecificationHandler(specifications, ctx)
  ctx.status = 200
  ctx.set('cache-control', 'no-cache')
  ctx.body = processLog
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

const associateProductSpecificationHandler = (
  specifications: Array<any>,
  ctx: Context
) => {
  const {
    clients: { specification },
  } = ctx
  if (specifications.length > 0) {
    let log: Array<any> = []
    specifications.forEach(async (spec) => {
      let skuId = parseFloat(searchValueByImpartialKey('_ProductId', spec))
      /* let fieldTypeName = searchValueByImpartialKey('FieldTypeName', spec) */
      let fieldId = searchValueByImpartialKey('FieldId', spec)
      let text = searchValueByImpartialKey('SpecificationValue', spec)
      let logItem: any = {}
   /*    if (fieldTypeName == 'CheckBox') {
        logItem = {
          skuId: skuId,
          specificationId: parseFloat(fieldId),
          success: false,
          message: `El valor ${text} para la especificacion ${parseFloat(
            fieldId
          )} de tipo CheckBox no se puedo actualizar`,
        }
      } else { */
        let reqBody: any = {
          Id: parseFloat(fieldId),
          Value: text,
        }
        await specification
          .associateProductSpecification(skuId, reqBody)
          .then((response: any) => {
            logItem = {
              skuId: response.skuId,
              specificationId: response.specificationId,
              success: response.success,
              message: response.message,
            }

          })
          .catch((error: any) => {
            console.log(error)
            logItem = {
              skuId: skuId,
              specificationId: parseFloat(fieldId),
              success: false,
              message: 'Algo salio mal',
            }
          })
     /*  } */
      console.log("logitem", logItem)
      log.push(logItem)
    })
    return log
  }
  return false
}

/* const createSpecifications = (specifications : Array<any>, ctx: Context) => {
  let log : Array<ILog> = []
  const {
    clients: { specification },
  } = ctx
  if(specifications.length > 0)
  {
    specifications.forEach((spec) => {
     let fieldIdValue =  searchValueByImpartialKey("FieldId", spec)
     let fieldNameValue =  searchValueByImpartialKey("FieldName", spec)
        let newSpecification : INewSpecification= {
          'fieldTypeId': '1',
          'fieldGroupId': fieldIdValue,
          'name': fieldNameValue
        }
      console.log("new Specification", newSpecification)
      specification.createSpecification(newSpecification)
    })
  }
  return log
} */
