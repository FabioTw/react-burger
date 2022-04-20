import { Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../services/thunk/getUser';
import { updateToken } from '../../services/thunk/updateToken';
import { getCookie } from '../../services/cookie';


export function ProtectedRoute({ children, ...rest }) {
  const { user, userFailed, tokenRequest, tokenFailed } = useSelector(state => state.profile)
  const dispatch = useDispatch();
  let location = useLocation();
  const [isUserLoaded, setUserLoaded] = useState(false);
  const history = useHistory();
  const init = async () => {
    if (getCookie('token') !== undefined){
      if (!user.name) {
        dispatch(getUser())
        if (userFailed) {
          dispatch(updateToken())
          if (!tokenRequest && !tokenFailed) {
            dispatch(getUser())
          }
        }
      }
    }
  };

  useEffect(() => {
    init();
    if (user.name) {
      setUserLoaded(true)
    } if (getCookie('token') === undefined) {
      history.replace({ pathname: '/login', state: { from: location } });
    }
  },[user, tokenFailed]);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.name ?
        children : 
        (
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
