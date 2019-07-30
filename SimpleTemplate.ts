import { SimpleCache } from "./cacheBase/Cache";
import { ICacheImp } from "./interfaces/ICacheImp";

export class SimpleFIFO<T, U> extends SimpleCache<T, U> implements ICacheImp<T, U> {

  public get(key: T): [U, number, number] | undefined {
    return this.update(key, (this.cache.get(key)));
  }

  public set(key: T, value: U): Map<T, [U, number, number]> {
    if(this.length() >= this._maxObjectsInCache && !this.has(key)) {
      // Definine eviction strategy.
    }
    return this.cache.set(key, [value, Date.now(), 0]);
  }

  private update(key: T, value: [U, number, number]): [U, number, number] {
    // If anything needs to be updated when a records is retrieved to make the eviction strategy
    // work correctly then place it here.
    return value;
  }

}