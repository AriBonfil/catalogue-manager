import React, { useState } from 'react'
import * as XLSX from 'xlsx'
//import { sendData } from './components/actions'

import './index.global.css'

const ButtonStyle = {
  backgroundColor: '#efefef',
  color: '#d2d2d2',
  cursor: 'no-drop',
  border: 'none',
}

const index = () => {
  const [nameFileImages, setNameFileImages] = useState()
  const [nameFileData, setNameFileData] = useState()
  const [dataFiles, setDataFiles] = useState({
    data: [],
    dataImages: [],
  })

  const handleInputChange = (event) => {
    const { name } = event.currentTarget
    if (event.target.files) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const data = event.target.result
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const json = XLSX.utils.sheet_to_json(worksheet)
        setDataFiles({ ...dataFiles, [name]: json })
      }
      //setNamaFileImages(event.target.files[0].name)
      console.log('name', name)
      console.log('teste: ', event.target.files[0].name)

      name === 'data'
        ? setNameFileData(event.target.files[0].name)
        : setNameFileImages(event.target.files[0].name)
      reader.readAsArrayBuffer(event.target.files[0])
    }

    console.log(dataFiles)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    //sendData(data, dataImages)
    setDataFiles({
      data: [],
      dataImages: [],
    })
    setNameFileImages(null)
    setNameFileData(null)
  }

  return (
    <section className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="file"
            name="data"
            id="data"
            onChange={handleInputChange}
          />
          <label htmlFor="data">
            <span>{nameFileData}</span>
            <strong>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="17"
                viewBox="0 0 20 17"
              >
                <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
              </svg>
              Choose a file Data…
            </strong>
          </label>
        </div>
        <div>
          <input
            type="file"
            name="dataImages"
            id="dataImages"
            onChange={handleInputChange}
          />
          <label htmlFor="dataImages">
            <span>{nameFileImages}</span>
            <strong>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="17"
                viewBox="0 0 20 17"
              >
                <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
              </svg>
              Choose a file image…
            </strong>
          </label>
        </div>
        <button
          type="submit"
          disabled={
            dataFiles.data.length > 0 && dataFiles.dataImages.length > 0
              ? ''
              : true
          }
          style={
            dataFiles.data.length > 0 && dataFiles.dataImages.length > 0
              ? undefined
              : ButtonStyle
          }
        >
          Cargar
        </button>
      </form>
    </section>
  )
}
export default index
