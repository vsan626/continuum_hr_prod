import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

const MuiInput = (props) => {
  const { id, name, value, error, errorMessage, label, onChange, type } = props;
  const [currentValue, setCurrentValue] = React.useState(value);

  // prop for error when user already exists
  // props for placeholder

  const setValue = (e) => {
    setCurrentValue(e.target.value);
    onChange(e);
  };
  return (
    <FormControl>
      {label !== undefined ? <InputLabel>{label}</InputLabel> : null}
      <Input
        id={id}
        name={name}
        value={currentValue}
        error={error}
        variant="outlined"
        onChange={setValue}
        type={type || "string"}
      />
      {error ? <div style={{ color: 'red' }}>{errorMessage}</div> : null}
    </FormControl>
  );
};

export default MuiInput;
