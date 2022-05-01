import { getCookie } from "../cookie";


export let socket = null;
export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    
    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, wsPrivateInit, onOpen, onClose, onError, onMessage,} = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(wsUrl);
      }
      if (type === wsPrivateInit) {
        socket = new WebSocket(`${wsUrl.slice(0,-4)}?token=${getCookie('token')}`);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        }

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        }

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          
          dispatch({ type: onMessage, payload: restParsedData });
        }

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        }
      }
      next(action);
    };
  };
};