import { Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { getUser } from '../../services/thunk/getUser';
import { updateToken } from '../../services/thunk/updateToken';
import { getCookie } from '../../services/cookie';


export const ProtectedRoute: FC<{path: string; exact: boolean}> = ({exact, path, children, ...rest }) => {
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
      history.replace({ pathname: '/react-burger/login', state: { from: location } });
    }
  },[user, userFailed]);

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
              pathname: '/react-burger/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
} 
