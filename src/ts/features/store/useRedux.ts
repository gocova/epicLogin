import { onCleanup } from "solid-js";
import { createMutable, modifyMutable, reconcile } from "solid-js/store";

export default function useRedux(store) {
  const currentState = store.getState();

  const state = createMutable({ ...currentState });

  const unsubscribe = store.subscribe(() => {
    const newState = store.getState();
    modifyMutable(state, reconcile(newState));
  });
  onCleanup(() => unsubscribe());
  return state;
}
