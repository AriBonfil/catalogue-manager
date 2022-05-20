/* eslint-disable react/prop-types */
import React from 'react'
import './TableData.global.css'

const TableData = ({ props }) => {
  return (
    <>
      {props && props && props.length > 0 && (
        <table>
          <caption>Table Data</caption>
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
            {props.map((i, index) => (
              <tr key={index}>
                <td scope="row" data-label="SkuId">
                  {i.skuId}
                </td>
                <td data-label="SpecificationId">{i.specificationId}</td>
                <td data-label="Success" style={i.success ? { color: 'green' } : { color: 'red' } }>
                  {i.success ? "True" : "False" }
                </td>
                <td data-label="Message">{i.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
export default TableData
/* {

              } */
