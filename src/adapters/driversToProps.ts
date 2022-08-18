import addToDo from "../useCases/addToDo";
import Storage from "../useCases/interfaces/Storage";
import listToDos from "../useCases/listToDos";
import markToDoAsDone from "../useCases/markToDoAsDone";
import State from "./interfaces/State";
import Action from "./interfaces/Action";
import driversToCache from "./driversToCache";

export default function driversToProps({
  storage,
  state,
  dispatch,
}: {
  storage: Storage;
  state: State;
  dispatch(action: Action): void;
}) {
  const cache = driversToCache({ state, dispatch });
  const adapters = { cache, storage };
  const items = listToDos(adapters);

  return {
    loading: items === null,
    toDos: items?.map(({ id, title, done, settled }) => ({
      key: id,
      title,
      checked: done,
      disabled: done || !settled,
      grayedOut: !settled,
      markAsDone: () => markToDoAsDone(id, adapters),
    })),
    addToDo: async (title: string) => addToDo(title, adapters),
  };
}
