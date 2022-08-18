import Cache from "./interfaces/Cache";
import Storage from "./interfaces/Storage";

export default async function markToDoAsDone(
  id: number,
  { storage, cache }: { storage: Storage; cache: Cache }
) {
  if (!cache.isInitialized()) {
    throw new Error("Cache not initialized yet");
  }

  const item = cache.read(id);

  if (item.done) {
    throw new Error("Item is already marked as done");
  }

  if (!item.settled) {
    throw new Error("Can not update not settled item");
  }

  const cacheUpdate = { ...item, done: true, settled: false };

  cache.update(id, cacheUpdate);

  try {
    const storageUpdate = { ...item, done: true };

    await storage.update(id, storageUpdate);

    cache.update(id, { ...cacheUpdate, settled: true });
  } catch {
    cache.update(id, item);
  }
}
