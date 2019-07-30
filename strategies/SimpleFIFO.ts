import { SimpleCache } from "../cacheBase/Cache";
import { ICacheImp } from "../interfaces/ICacheImp";

export class SimpleFIFO<T, U> extends SimpleCache<T, U> implements ICacheImp<T, U> {
  private keyArray: T[] = [];

  public get(key: T): [U, number, number] | undefined {
    return this.cache.get(key);
  }

  public set(key: T, value: U): Map<T, [U, number, number]> {
    if(this.keyArray.length >= this._maxObjectsInCache && !this.cache.has(key)) {
      this.cache.delete(this.keyArray.shift());
    }
    this.keyArray.push(key);
    return this.cache.set(key, [value, Date.now(), 0]);
  }

  public clear(): void {
    super.clear();
    this.keyArray = [];
  }

}