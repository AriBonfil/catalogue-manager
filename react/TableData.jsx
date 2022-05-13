import React from 'react'
import './TableData.global.css'

export const TableData = () => {
  return (
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
        <tr>
          <td data-label="SkuId">13</td>
          <td data-label="Specification Id">4546544</td>
          <td data-label="Success" style={{ color: '#04d361' }}>
            True
          </td>
          <td data-label="Message">fsdjfkjsdlkf</td>
        </tr>
        <tr>
          <td scope="row" data-label="SkuId">
            13
          </td>
          <td data-label="Specification Id">55645654</td>
          <td data-label="Success" style={{ color: '#ff0000' }}>
            False
          </td>
          <td data-label="Message">fdsfsdfsdf</td>
        </tr>
        <tr>
          <td scope="row" data-label="SkuId">
            199
          </td>
          <td data-label="Specification Id">55645654</td>
          <td data-label="Success" style={{ color: '#04d361' }}>
            True
          </td>
          <td data-label="Message">fdsfdsfsdf</td>
        </tr>
        <tr>
          <td scope="row" data-label="SkuId">
            1345
          </td>
          <td data-label="SpecificationId">55645654</td>
          <td data-label="Success" style={{ color: '#ff0000' }}>
            False
          </td>
          <td data-label="Message">02/01/2016</td>
        </tr>
      </tbody>
    </table>
  )
}
