
/*
 * @description  typescript封装LocalStorage并支持过期时间
 * @author haleLy 2023-08-23 11:17:43
*/

//expire  过期时间key permanent 永久不过期
import { StorageCls, Str, Expire, Date, Result } from "./type";
import { Dictionaries } from "./enum";
export class Storage implements StorageCls {
    //获取localStorage
    public  get<T = any>(key: Str): Result<T | null> {
        const value = localStorage.getItem(key)
        if (value) {
            const data: Date<T> = JSON.parse(value);
            const now = new Date().getTime();
            //有效并且是数组类型 并且过期了 进行删除和提示
            if (typeof data[Dictionaries.expire] == 'number' && data[Dictionaries.expire] < now) {
                this.remove(key)
                return {
                    message: `您的${key}已过期`,
                    value: null
                }
            } else {
                //否则成功返回
                return {
                    message: "成功读取",
                    value: data.value
                }
            }
        }
        return {
            message: '值无效',
            value: null
        }
    }
    //设置localStorage和过期时间
    set<T = any>(key: Str, value: T, expire: Expire = Dictionaries.permanent) {
        //格式化数据
        const data: Date<T> = {
            value,
            [Dictionaries.expire]: expire
        }
        localStorage.setItem(key, JSON.stringify(data));

    }
    //删除
    remove(key: Str) {
        localStorage.removeItem(key);
    }
    //清除
    clear() {
        localStorage.clear()
    }
}


