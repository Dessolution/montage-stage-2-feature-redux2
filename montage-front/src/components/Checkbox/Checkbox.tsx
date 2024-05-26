
// import { useEffect, useId, useRef } from "react";
import "./Checkbox.css"
/*
type Props = {
  isChecked?: boolean,
  isIndeterminate?: boolean,
  label: string,
}

export const Checkbox = ({
  isChecked = false, 
  isIndeterminate = false, 
  label
}: Props) => {
  const id = useId();
  const checkboxRef = useRef<HTMLInputElement>(null)
  useEffect(function changeCheckBoxState() {
    if (!checkboxRef.current) return;
    if (isChecked) {
      checkboxRef.current.checked = true;
      checkboxRef.current.indeterminate = false;
      return;
    }
    if (isIndeterminate) {
      checkboxRef.current.checked = false;
      checkboxRef.current.indeterminate = true;
      return;
    }
    checkboxRef.current.checked = false;
    checkboxRef.current.indeterminate = false;
  }
)}
*/

import React, { ReactNode } from 'react';

interface CheckboxProps {
  children: ReactNode;
}

const Checkbox: React.FC<CheckboxProps> = ({ children }) => {
  return (
    <label className='checkboxArea__input'>
      <input id='checkbox' type='checkbox' />
      <p className='checkboxArea__input-custom'></p>
      <p className='checkboxArea__input-text'>{children}</p>
    </label>
  );
}

export default Checkbox;



