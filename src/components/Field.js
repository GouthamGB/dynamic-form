import React from 'react'

function Field({field, handleInputChange, formData}) {

    const {type, items, order, isRequired, isReadonly, label} = field
    switch(type){
        case 'date': 
            return (<input type="date" tabIndex={order} required={isRequired} readOnly={isReadonly} name={label} onChange={handleInputChange} value={formData[label] || ''}/>)

        case 'number':
            return (
                <input type="number" tabIndex={order} required={isRequired} readOnly={isReadonly} onChange={handleInputChange} value={formData[label] || ''} name={label} />
            )
        
        case 'dropdown':
            return(
                <select  tabIndex={order} required={isRequired} readOnly={isReadonly}>
                    {items.map((item, index)=>( <option value={item.value} key={index}>{item.text}</option>))}
                </select>)

        default: return
    }
  
}

export default Field