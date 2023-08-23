/*
 * @description 实战TS编写发布订阅模式
 * @author haleLy 2023-08-23 11:38:37
*/
interface EventFace {
    on: (name: string, fn: Function) => void;
    emit: (name: string, ...arg: Array<any>) => void;
    off: (name: string, fn: Function) => void;
    once: (name: string, fn: Function) => void;
}
interface ListFn {
    [key: string]: Array<Function>
}
class DisPatch implements EventFace {
    list: ListFn
    constructor() {
        this.list = {}
    }
    //订阅/监听
    on(name: string, fn: Function) {
        let callbackList = this.list[name] || [];
        callbackList.push(fn)
        this.list[name] = callbackList;
    }
    //发布/注册
    emit(name: string, ...arg: Array<any>) {
        let eventNames = this.list[name]
        if (eventNames) {
            eventNames.forEach(el => {
                el.apply(this, arg)
            })
        } else {
            console.error(`名称错误${name}`)
        }
    }
    //解除绑定
    off(name: string, fn: Function) {
        let eventNames = this.list[name];
        if (eventNames && fn) {
            let index = eventNames.findIndex(fns => fns === fn)
            eventNames.splice(index, 1)
        } else {
            console.error('该事件未监听');
        }
    }
    //只执行一次
    once(name: string, fn: Function) {
        let decor = (...args: Array<any>) => {
            fn.apply(this, args)
            this.off(name, decor)
        }
        this.on(name, decor)
    }

}
//创建实例
const o = new DisPatch();
//注册订阅/监听
o.on('post', (...res) => {
    console.log(1, res)
})
const fn2 = (...res) => {
    console.log(2, res)
}
o.on('post', fn2)
o.once('post',(...res) => {
    console.log(3, res)
})
//发布/注册
o.emit('post', 1, false, { name: 'hale' })
o.off('post', fn2)