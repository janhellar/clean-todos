import Cache from "./interfaces/Cache";
import Storage from "./interfaces/Storage";

export default function listToDos({
  storage,
  cache,
}: {
  storage: Storage;
  cache: Cache;
}) {
  if (cache.isInitialized()) {
    return cache.list();
  }

  const promise = storage.list();

  async function cacheResult() {
    const toDos = await promise;

    cache.initialize(toDos);
  }

  cacheResult();

  return null;
}
