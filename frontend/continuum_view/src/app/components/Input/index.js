import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';

const MuiInput = (props) => {
  const {
    id,
    name,
    value,
    error,
    errorMessage,
    label,
    onChange,
    type,
    customStyles
  } = props;
  const [currentValue, setCurrentValue] = React.useState(value);
  const cc = useStyles();
  let icon = null;
  if (name === 'loginPassword' || name === 'registerPassword') {
    icon = <LockIcon />;
  } else if (name === 'loginUsername' || name === 'registerUsername') {
    icon = <PersonIcon />;
  }

  const setValue = (e) => {
    setCurrentValue(e.target.value);
    onChange(e);
  };

  console.log('muiinput', customStyles);
  return (
    <FormControl>
      {label !== undefined ? (
        <InputLabel
          classes={{
            root: cc.inputLabel
          }}
        >
          {label}
        </InputLabel>
      ) : null}
      <Input
        classes={{
          root: cc.inputRoot,
          input: cc.input
        }}
        autoComplete="off"
        id={id}
        name={name}
        value={currentValue}
        error={error}
        variant="outlined"
        onChange={setValue}
        type={type || 'string'}
        startAdornment={
          <InputAdornment position="start">{icon}</InputAdornment>
        }
        disableUnderline={true}
      />
      {error ? <div style={{ color: 'red' }}>{errorMessage}</div> : null}
    </FormControl>
  );
};

// TODO: style the input
const useStyles = makeStyles({
  inputRoot: {
    // minWidth: 300,
    maxWidth: '100%',
    border: '1px solid',
    borderRadius: 15,
    backgroundColor: 'rgba(237, 237, 237, 0.5)',
    paddingLeft: 10
  },
  inputLabel: {
    paddingLeft: 20
  }
});

export default MuiInput;
