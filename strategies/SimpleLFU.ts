import { SimpleCache } from "../cacheBase/Cache";
import { ICacheImp } from "../interfaces/ICacheImp";

export class SimpleLFU<T, U> extends SimpleCache<T, U> implements ICacheImp<T, U> {

  public get(key: T): [U, number, number] | undefined {
    return this.update(key, this.cache.get(key));
  }

  public set(key: T, value: U): Map<T, [U, number, number]> {
    if(this.cache.size >= this._maxObjectsInCache && !this.cache.has(key)) {
      // Find the least recently used.
      let leastFrequentlyUsedKey: T = undefined;
      let lowestEntry: number = undefined;
      for(let [key, value] of this.cache.entries()) {
        if(value[2] < lowestEntry || lowestEntry === undefined) {
          lowestEntry = value[2];
          leastFrequentlyUsedKey = key;
        }
        // If 0 then break as lower is not possible.
        if(lowestEntry === 0) {break;}
      }
      // And delete it.
      this.cache.delete(leastFrequentlyUsedKey);
    }
    return this.cache.set(key, [value, 0, 0]);
  }

  private update(key: T, value: [U, number, number] | undefined): [U, number, number] | undefined {
    this.cache.set(key, [value[0], 0, value[2] + 1]);
    return [value[0], 0, value[2] + 1];
  }

}