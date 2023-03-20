import React from 'react'
import Backdrop from './Backdrop'



function Modal({formData,handleClose}) {
  return (
    <Backdrop>
      <div className='modal'>
        <h1>Submitted Successfully</h1>
        <h2>Preview</h2>
        <div className='data-container'>
        {Object.keys(formData).map(key => (
        <div key={key}>
          <span>{key}: </span>
          <span>{formData[key]}</span>
        </div>
      ))}
      </div>
       <button onClick={handleClose}>Close</button>
      </div>
    </Backdrop>
  )
}

export default Modal