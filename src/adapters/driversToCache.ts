import Cache, { CachedToDo } from "../useCases/interfaces/Cache";
import State from "./interfaces/State";
import Action from "./interfaces/Action";

export default function driversToCache({
  state,
  dispatch,
}: {
  state: State;
  dispatch(action: Action): void;
}) {
  const cache: Cache = {
    initialize: (items) => dispatch({ type: "initialize", payload: { items } }),
    isInitialized: () => state.initialized,
    create: (item) => {
      const cacheItem: CachedToDo = {
        ...item,
        id: state.idCounter,
      };
      dispatch({ type: "create", payload: { item: cacheItem } });
      return cacheItem;
    },
    read: (id) => {
      const item = state.items.find((item) => item.id === id);
      if (!item) {
        throw new Error("Item with this id does not exist");
      }
      return item;
    },
    update: (id, item) => dispatch({ type: "update", payload: { id, item } }),
    delete: (id) => dispatch({ type: "delete", payload: { id } }),
    list: () => state.items,
  };

  return cache;
}
