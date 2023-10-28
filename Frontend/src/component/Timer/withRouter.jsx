import { useNavigate } from 'react-router-dom';

const withRouter = WrappedComponent => props => {
  const navigate = useNavigate();
  // other hooks

  return (
    <WrappedComponent
      {...props}
      {...{ navigate, /* other hooks */ }}
    />
  );
};

export default withRouter;