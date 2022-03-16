import { Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../services/thunk/getUser';

export function ProtectedRoute({ children, ...rest }) {
  const { user } = useSelector(state => state.profile)
    const dispatch = useDispatch();
    const [isUserLoaded, setUserLoaded] = useState(false);

  const init = () => {
    if (!user.name) {
      dispatch(getUser())
      setUserLoaded(true);
    }
  };

  useEffect(() => {
    init();
  });

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.name ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
} 