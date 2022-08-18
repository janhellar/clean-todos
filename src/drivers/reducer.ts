import State from "../adapters/interfaces/State";
import Action from "../adapters/interfaces/Action";

export const initialState: State = {
  idCounter: -1,
  initialized: false,
  items: [],
};

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "initialize":
      return {
        ...state,
        initialized: true,
        items: action.payload.items.map((item) => ({ ...item, settled: true })),
      };
    case "create":
      return {
        ...state,
        idCounter: state.idCounter - 1,
        items: [action.payload.item, ...state.items],
      };
    case "update":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload.item : item
        ),
      };
    case "delete":
      return {
        ...state,
        items: state.items.filter(({ id }) => id !== action.payload.id),
      };
    default:
      throw new Error("Unknown action type");
  }
}
