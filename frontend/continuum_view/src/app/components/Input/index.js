import * as React from 'react';
import Input from '@material-ui/core/Input';

const MuiInput = (props) => {
  const {
    id,
    name,
    usernameError,
    usernameErrorMessage,
    placeholder,
    onChange,
    helperText
  } = props;
  const [currentValue, setCurrentValue] = React.useState('');

  // prop for error when user already exists
  // props for placeholder

  const setValue = (e) => {
    setCurrentValue(e.target.value);
    onChange(e);
  };
  return (
    <Input
      id={id}
      name={name}
      value={currentValue}
      error={usernameError}
      variant="outlined"
      placeholder={placeholder}
      // helperText={usernameError ? usernameErrorMessage : ''}
      onChange={setValue}
    />
  );
};

export default MuiInput;
