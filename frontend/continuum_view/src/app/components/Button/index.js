import MuiButton from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const Button = ({ isLoading, children, type, color }) => {
  console.log({ color });
  const cc = useStyles();
  return (
    <MuiButton
      variant="contained"
      color="success"
      type={type}
      classes={{
        root: cc.buttonRoot,
        outlined: cc.outline
      }}
    >
      {isLoading ? <CircularProgress /> : children}
    </MuiButton>
  );
};

const useStyles = makeStyles({
  buttonRoot: {
    color: 'blue',
    backgroundColor: 'rgba(132, 219, 183, 0.86)',
    '&:hover': {
      backgroundColor: 'rgba(67, 208, 86, 0.80)',
      color: 'rgb(0, 0, 0)'
    }
  }
});

export default Button;
