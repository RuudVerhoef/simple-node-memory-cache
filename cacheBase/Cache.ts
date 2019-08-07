export abstract class SimpleCache<T, U> {

  protected cache: Map<T,[U, number, number]> = new Map<T, [U, number, number]>();
  protected _maxObjectsInCache: number;

  constructor(maxObjectsInCache: number = 5) {
    this._maxObjectsInCache = maxObjectsInCache;
  }

  get maxObjectsInCache(): number {
    return this._maxObjectsInCache;
  }

  set maxObjectsInCache(max: number) {
    this._maxObjectsInCache = max;
  }

  public clear(): void {
    this.cache.clear();
  }

  public has(key: T): boolean {
    return this.cache.has(key);
  }

  public length(): number {
    return this.cache.size;
  }

  public delete(key: T): void {
    this.cache.delete(key);
  }

  public entries(): IterableIterator<[T, [U, number, number]]> {
    return this.cache.entries();
  }

  public keys(): IterableIterator<T> {
    return this.cache.keys();
  }

  public values(): IterableIterator<[U, number, number]> {
    return this.cache.values();
  }
  
}