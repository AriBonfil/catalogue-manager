import { json } from 'co-body'
import {ILog /* , INewSpecification */} from '../interfaces'
export async function sendData(ctx: Context, next: () => Promise<any>) {
  const body: any = await json(ctx.req)
  let {specifications} = parseBody(body)
  /* let resultLog = createSpecifications(specifications, ctx) */
  let updateResultLog = updateSkuSpecifications(specifications, ctx)
  console.log("update log", updateResultLog)
  ctx.status = 200
  ctx.set('cache-control', 'no-cache')
  ctx.body = updateResultLog
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

  return {specifications, images}
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
function searchValueByImpartialKey(nameKey: any, obj : any) {
  if (obj.hasOwnProperty(nameKey)) {
    return obj[nameKey];
  } else {
    var res = Object.keys(obj).filter(function(k) {
      return (k.toLowerCase().indexOf(nameKey.toLowerCase()) > -1) || (nameKey.toLowerCase().indexOf(k.toLowerCase()) > -1);
    });
     return res ? obj[res[0]] : false;
  }}
const updateSkuSpecifications = (specifications : Array<any>, ctx: Context) => {
  let log : Array<ILog> = []
const {
 /*    clients: { specification }, */
  } = ctx
  if(specifications.length > 0)
  {
    specifications.forEach((spec) => {
      console.log(spec)
    let skuId = searchValueByImpartialKey("_ProductId", spec)
    let specificationCode = searchValueByImpartialKey("SpecificationCode", spec)
    let fieldId = searchValueByImpartialKey("FieldId", spec)
    let fieldValueId =  searchValueByImpartialKey("FieldValueId", spec)

        let updateObject : Object = {
          "Id": specificationCode,
          "FieldId": fieldId,
          "FieldValueId": specificationCode,
          "Text": spec.SpecificationValue
        }
      console.log("new Specification", updateObject, "skuid", skuId)
     /*  specification.updateSpecification(updateObject, skuId) */
    })
  }
  return log
}
