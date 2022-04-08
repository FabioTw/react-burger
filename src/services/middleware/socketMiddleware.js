export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(wsUrl);
      }
      if (socket) {
        socket.onopen = event => {
          console.log(' Подключение')
          dispatch({ type: onOpen, payload: event });
          socket.send('test')
        }

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        }

        socket.onmessage = event => {
          console.log('Данные получены')
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