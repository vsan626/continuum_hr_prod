import MuiButton from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const Button = ({ isLoading, children, type }) => {
  return (
    <MuiButton type={type}>
      {isLoading ? <CircularProgress /> : children}
    </MuiButton>
  );
};

export default Button;
