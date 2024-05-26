import './input.css'
import React, { FC } from 'react'
import PasswordSwitch from '../../assets/images/PasswordSwitch';

interface InputProps {
    placeholderText?: string;
    className?: string;
    children?: React.ReactNode | string;
    type?: string;
    id?: string | number;
}

const Input: FC<InputProps> = ({ placeholderText, className, children, type }) => {
    return (
        <input required className={className} placeholder={placeholderText} type={type}>{children}</input>
    )
}

export default Input;