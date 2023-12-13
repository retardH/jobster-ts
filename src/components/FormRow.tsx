import React from 'react';

type FormRowProps = {
  type?: string;
  name: string;
  labelText?: string;
  inputProps: React.HTMLProps<HTMLInputElement>;
};

const FormRow = ({
  type = 'text',
  labelText,
  name,
  inputProps,
}: FormRowProps) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        {...inputProps}
        className="form-input"
        type={type}
        name={name}
        autoComplete={name}
      />
    </div>
  );
};

export default FormRow;
