/* eslint-disable react/prop-types */
import React from 'react'
import './TableData.global.css'

const TableData = ({ props }) => {
  console.log("props", props.logSpec);
  return (
    <>
      {props && (
        <>
       {props.logSpec && <table>
          <caption>Specifications Log</caption>
          <thead>
            <tr>
              <th scope="col">SkuId</th>
              <th scope="col">Specification Id</th>
              <th scope="col">Success</th>
              <th scope="col" style={{ width: '30%' }}>
                Message
              </th>
            </tr>
          </thead>
          <tbody>
            {props.logSpec.length > 0 && props.logSpec.map((i, index) => (
              <tr key={index}>
                <td scope="row" data-label="SkuId">
                  {i.skuId || ""}
                </td>
                <td data-label="SpecificationId">{i.specificationId  || ""}</td>
                <td data-label="Success" style={i.success ? { color: 'green' } : { color: 'red' } }>
                  {i.success ? "True" : "False"  || ""}
                </td>
                <td data-label="Message">{i.message  || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>}
        {props.logImages && <table>
          <caption>Images Log</caption>
          <thead>
            <tr>
              <th scope="col">SkuId</th>
              <th scope="col">Image Name</th>
              <th scope="col">Image Url</th>
              <th scope="col">Success</th>
              <th scope="col" style={{ width: '30%' }}>
                Message
              </th>
            </tr>
          </thead>
          <tbody>
             {props.logImages.length > 0 && props.logImages.map((i, index) => (
              <tr key={index}>
                <td scope="row" data-label="SkuId">
                  {i.skuId  || ""}
                </td>
                <td data-label="ImageName">{i.imageName  || ""}</td>
                <td data-label="imageUrl">{i.imageUrl  || ""}</td>
                <td data-label="Success" style={i.success ? { color: 'green' } : { color: 'red' } }>
                  {i.success ? "True" : "False"  || ""}
                </td>
                <td data-label="Message">{i.message != "" && i.message}</td>
              </tr>
            ))}
          </tbody>
        </table>}

        </>
      )}
    </>
  )
}
export default TableData