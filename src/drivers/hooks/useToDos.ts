import { useMemo, useReducer } from "react";
import driversToProps from "../../adapters/driversToProps";
import reducer, { initialState } from "../reducer";
import LocalStorage from "../LocalStorage";

export default function useToDos(name: string) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const storage = useMemo(() => new LocalStorage(name), []);

  return driversToProps({ state, dispatch, storage });
}
