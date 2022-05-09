import { TIngredients, TWSActions } from "../../types/types";
import { getCookie } from "../cookie";

interface IAction {
  type:TWSActions| string; 
  payload:TIngredients[] | Event;
}

export let socket: WebSocket|null = null;

export const socketMiddleware = (wsUrl: string, wsActions: TWSActions) => {
  return (store: {getState: ()=>void; dispatch: ({})=>void}) => {
    
    return (next: (action: IAction)=> void) => (action: IAction) => {
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
        socket.onopen = (event: Event) => {
          dispatch({ type: onOpen, payload: event });
        }

        socket.onerror = (event: Event) => {
          dispatch({ type: onError, payload: event });
        }

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          
          dispatch({ type: onMessage, payload: restParsedData });
        }

        socket.onclose = (event: Event) => {
          dispatch({ type: onClose, payload: event });
        }
      }
      next(action);
    };
  };
};