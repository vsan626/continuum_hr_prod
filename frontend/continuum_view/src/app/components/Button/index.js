import MuiButton from '@material-ui/core/Button';
import LoadingIcon from '@material-ui/core/CircularProgress';

const Button = ({ isLoading, children, type }) => {
  return (
    <MuiButton type={type}>{isLoading ? <LoadingIcon /> : children}</MuiButton>
  );
};

export default Button;
