import React from "react";

type FormRowProps = {
  type?: string;
  value: string;
  name: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  labelText?: string;
  register?: any;
};

const FormRow = ({
  type = "text",
  value,
  handleChange,
  labelText,
  name,
  register,
}: FormRowProps) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        autoComplete={name}
        type={type}
        name={name}
        className="form-input"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormRow;