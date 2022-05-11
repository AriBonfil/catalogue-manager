export interface IUnifiedObject {
  productId?: String,
  productName?: String,
  productSpecifications?: Array<ISpecifications>
}
export interface ISpecifications {
  fieldId?: String,
  fieldType?: String,
  fieldValue?: String,
  specificationValue?: String,
}
export interface INewSpecification {
  fieldTypeId?: String,
  fieldGroupId?: String,
  name?: String,
  skuId?: String,
}
export interface ILog {
  skuId?: Number,
  specificationId?: Number,
  success?: boolean,
  message?: String
}
