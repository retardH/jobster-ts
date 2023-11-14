import React from "react";

type FormRowSelectProps = {
  options: any[];
  labelText?: string;
  name: string;
  inputProps: React.HTMLProps<HTMLSelectElement>;
};

const FormRowSelect = ({
  options,
  labelText,
  name,
  inputProps,
}: FormRowSelectProps) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select className="form-select" name={name} {...inputProps}>
        {options.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;