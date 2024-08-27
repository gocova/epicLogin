import { createContext, ParentProps, useContext } from "solid-js";

const StateContext = createContext();

interface StateProviderProps extends ParentProps {
  store: any;
}

export function StateProvider(props: StateProviderProps) {
  return (
    <StateContext.Provider value={props.store}>
      {props.children}
    </StateContext.Provider>
  );
}

export function useState() {
  const stateContext = useContext(StateContext);
  if (!stateContext) {
    throw new Error("useState: cannot find a StateContext");
  }
  return stateContext;
}
