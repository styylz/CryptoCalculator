import React from "react";

interface InputProps {
  label?: string;
  type: string;
  value: string| number;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  placeholder?: string;
  readOnly?: boolean;
  name?: string;
  children?: JSX.Element
}
export const Input: React.FC<InputProps> = ({
  label,
  type,
  value,
  handleChange,
  id,
  placeholder,
  readOnly,
  name,
  children,
}) => {
  console.log(value);
  return (
    <>
      <label htmlFor={id}>{label || ""}</label>
      <div className="inputList-container">
        <input
          value={value}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder || ''}
          onChange={handleChange ? ((e) => handleChange(e)) : ''}
          readOnly={readOnly || false}
        />
        {children || ""}
      </div>
    </>
  );
};
