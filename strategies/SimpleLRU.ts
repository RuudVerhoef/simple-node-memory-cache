import { SimpleCache } from "../cacheBase/Cache";
import { ICacheImp } from "../interfaces/ICacheImp";

export class SimpleLRU<T, U> extends SimpleCache<T, U> implements ICacheImp<T, U> {

  public get(key: T): [U, number, number] | undefined {
    return this.update(key, this.cache.get(key));
  }

  public set(key: T, value: U): Map<T, [U, number, number]> {
    if(this.cache.size >= this._maxObjectsInCache && !this.cache.has(key)) {
      // Find the least recently used.
      let leastRecentlyUsedKey: T = undefined;
      let oldestEntry: number = undefined;
      for(let [key, value] of this.cache.entries()) {
        if(value[1] < oldestEntry || oldestEntry === undefined) {
          oldestEntry = value[1];
          leastRecentlyUsedKey = key;
        }
      }
      // And delete it.
      this.cache.delete(leastRecentlyUsedKey);
    }
    return this.cache.set(key, [value, Date.now(), 0]);
  }

  private update(key: T, value: [U, number, number] | undefined): [U, number, number] | undefined {
    const read: number = Date.now();
    this.cache.set(key, [value[0], read, 0]);
    return [value[0], read, 0];
  }

}