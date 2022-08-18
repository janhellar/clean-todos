import { CachedToDo } from "../../useCases/interfaces/Cache";
import { StorageToDo } from "../../useCases/interfaces/Storage";

type Action =
  | {
      type: "initialize";
      payload: {
        items: StorageToDo[];
      };
    }
  | {
      type: "create";
      payload: {
        item: CachedToDo;
      };
    }
  | {
      type: "update";
      payload: {
        id: number;
        item: CachedToDo;
      };
    }
  | {
      type: "delete";
      payload: {
        id: number;
      };
    };

export default Action;
