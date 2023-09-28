import React, { useContext, useState } from 'react'
import { ButtonPropsModel } from './Button.model'

export const Button: React.FC<ButtonPropsModel> = props => {
    const { title, className, variation , eventHandler} = props 
    return (
        <button className={className} onClick={eventHandler}>
            {title}
        </button>
    )
}