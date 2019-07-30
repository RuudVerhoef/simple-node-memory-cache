export interface ICacheImp<T, U> {

  get(key: T): [U, number, number] | undefined;
  set(key: T, value: U): Map<T, [U, number, number]>;
  
}