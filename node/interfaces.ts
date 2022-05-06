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
export interface IUpdateSpecifications { 
  id: Number,
  skuId: Number,
  fieldId: Number,
  fieldValueId: Number,
  text: String
}