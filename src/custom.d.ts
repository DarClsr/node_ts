// 类型耦合  可以自定义没有定义的属性 类型

namespace Express {
    interface Request {
        property:string
        username:string
    }
}