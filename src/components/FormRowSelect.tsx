type FormRowSelectProps = {
  handleChange: any;
  options: any[];
  labelText?: string;
  name: string;
  value: string;
};

const FormRowSelect = ({
  handleChange,
  options,
  labelText,
  name,
  value,
}: FormRowSelectProps) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
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
