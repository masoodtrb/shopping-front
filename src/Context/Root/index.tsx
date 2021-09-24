import React, {
    createContext,
    useReducer,
    Dispatch,
    PropsWithChildren,
    useContext,
  } from 'react';
  import * as fromRootActions from './actions';
  import { RootInitialState, RootReducer, _RootReducerState } from './reducer';
  
  const RootContext = createContext<{
    state: _RootReducerState;
    dispatch: Dispatch<fromRootActions.RootActions>;
    logout: () => void;
  }>({
    state: RootInitialState,
    dispatch: () => null,
    logout: () => null,
  });
  
  export interface RootProviderProps {}
  
  function RootProvider({ children }: PropsWithChildren<RootProviderProps>) {
    const init = {
      ...RootInitialState,
    };
    const [state, dispatch] = useReducer(RootReducer, init);
  
    function logout() {
      dispatch(fromRootActions.setUserInfo(null));
    }
  
    return (
      <RootContext.Provider value={{ state, dispatch, logout }}>
        {children}
      </RootContext.Provider>
    );
  }
  
  function useRoot() {
    const context = useContext(RootContext);
  
    if (context === undefined) {
      throw new Error('useRoot must be used within a RootProvider');
    }
    return context;
  }
  
  export { RootProvider, useRoot, fromRootActions };
  