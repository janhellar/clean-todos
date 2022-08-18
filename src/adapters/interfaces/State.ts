import { CachedToDo } from "../../useCases/interfaces/Cache";

export default interface State {
  idCounter: number;
  initialized: boolean;
  items: CachedToDo[];
}
