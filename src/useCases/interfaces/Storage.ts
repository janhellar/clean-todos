import ToDo from "../../entities/ToDo";

export interface StorageToDo extends ToDo {
  id: number;
}

export default interface Storage {
  create(item: ToDo): Promise<StorageToDo>;
  read(id: number): Promise<StorageToDo>;
  update(id: number, item: ToDo): Promise<void>;
  delete(id: number): Promise<void>;
  list(): Promise<StorageToDo[]>;
}
