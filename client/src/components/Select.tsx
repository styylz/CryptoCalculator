import React from 'react'

interface SelectProps {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const Select:React.FC<SelectProps> = ({onChange}) => {
  return (
    <div>
    <label htmlFor="currencies">Choose currency</label>
    <select
      onChange={onChange}
      id="currencies"
      name="currencies"
    >
      <option value="undefined" disabled selected>
        Choose currency
      </option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
      <option value="USD">USD</option>
    </select>
  </div>
  )
}

export default Select