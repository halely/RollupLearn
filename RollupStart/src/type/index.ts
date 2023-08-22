//expire  过期时间key  //permanent 永久不过期
import { Dictionaries } from "../enum";
export type Str=string;
export type Expire = Dictionaries.permanent | number //有效期类型
export interface Date<T>{
   value:T,
   [Dictionaries.expire]:Expire
}

export interface Result<T> { //返回值类型
    message: string,
    value: T | null
}

export interface StorageCls {
    get: <T>(key:Str) => Result<T | null>;
    set: <T>(key:Str,value:T,expire:Expire) => void;
    remove: (key: Str) => void;
    clear: () => void;
}