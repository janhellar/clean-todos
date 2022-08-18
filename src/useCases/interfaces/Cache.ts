import ToDo from "../../entities/ToDo";
import { StorageToDo } from "./Storage";

export interface CachedToDo extends ToDo {
  id: number;
  settled: boolean;
}

export default interface Cache {
  initialize(items: StorageToDo[]): void;
  isInitialized(): boolean;
  create(item: ToDo & { settled: boolean }): CachedToDo;
  read(id: number): CachedToDo;
  update(id: number, item: CachedToDo): void;
  delete(id: number): void;
  list(): CachedToDo[];
}
