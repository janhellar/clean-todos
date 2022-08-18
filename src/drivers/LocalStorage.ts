import Storage, { StorageToDo } from "../useCases/interfaces/Storage";
import ToDo from "../entities/ToDo";

export default class LocalStorage implements Storage {
  constructor(private key: string) {}

  async create(item: ToDo) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const storage = this.get();
    const newItem = { ...item, id: storage.idCounter };
    storage.items.unshift(newItem);
    storage.idCounter++;
    localStorage.setItem(this.key, JSON.stringify(storage));
    return newItem;
  }

  async read(id: number) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const storage = this.get();
    const todo = storage.items.find((todo: StorageToDo) => todo.id === id);

    if (!todo) {
      throw new Error("Item not found");
    }

    return todo;
  }

  async update(id: number, item: ToDo) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const storage = this.get();
    const todo = storage.items.find((todo: StorageToDo) => todo.id === id);

    if (todo) {
      todo.done = item.done;
      todo.title = item.title;
    }

    localStorage.setItem(this.key, JSON.stringify(storage));
  }

  async delete() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  async list() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const storage = this.get();
    return storage.items;
  }

  private get() {
    const storage = localStorage.getItem(this.key);

    if (!storage) {
      const initialValue = { idCounter: 0, items: [] };
      localStorage.setItem(this.key, JSON.stringify(initialValue));
      return initialValue;
    }

    return JSON.parse(storage);
  }
}
