import React, { type PropsWithChildren, useContext, useReducer } from "react";
import { initialState, AuthReducer, type AuthState, type AuthAction } from "./reducer";

export const useAuthorization = (): AuthState => {
  const context = useContext(AuthStateContext);
  return context;
};

export const useAuthorizationDispatch = (): React.Dispatch<AuthAction> => {
  const context = useContext(AuthDispatchContext);
  return context;
};

const AuthStateContext = React.createContext<AuthState>(initialState);
const AuthDispatchContext = React.createContext<React.Dispatch<AuthAction>>(() => null);

export const AuthProvider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [user, dispatch] = useReducer<React.Reducer<AuthState, AuthAction>>(
    AuthReducer,
    initialState
  );

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
