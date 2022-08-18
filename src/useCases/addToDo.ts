import Cache from "./interfaces/Cache";
import Storage from "./interfaces/Storage";

export default async function addToDo(
  title: string,
  { storage, cache }: { storage: Storage; cache: Cache }
): Promise<void> {
  if (!cache.isInitialized()) {
    throw new Error("Cache not initialized yet");
  }

  const newItem = { title, done: false, settled: false };
  const optimisticItem = cache.create(newItem);

  try {
    const item = await storage.create(newItem);
    const update = { ...item, settled: true };

    cache.update(optimisticItem.id, update);
  } catch {
    cache.delete(optimisticItem.id);
  }
}
