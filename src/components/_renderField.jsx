import React from 'react'

export const renderInput = ({ input, label, type, meta: { touched, error } }) => {
    return <p className={touched && error ? 'error' : ''}><input {...input} placeholder={label} type={type} /></p>
}
