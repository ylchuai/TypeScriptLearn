/**
 * 枚举
 */
(() => {
    /* 数字枚举 */
    /* 反向映射 */
    // 直接赋值会默认向下递增
    // 可以使用函数 变量 但不会默认递增，需要初始化下一个值
    function* getstatu() {
        yield 1;
        return 0;
    }
    console.log()
    enum Statu {
        padding = getstatu().next().value,
        success = getstatu().next().value,
        fail = -1
    }
    console.log(Statu.padding, Statu[-1]);
    /* 字符串枚举 */

    enum Message{
        Error = 'Sorry, error',
        Success = 'wellDonw!',
        Failed = Error // 只能使用自身枚举的成员
    }
    console.log(Message.Failed, Message.Success, Message['wellDonw!'])

    /* 异构枚举 */

    // 既包含字符串，也包含数字的枚举称为异构枚举
    // 非必要尽量不要使用

    /* 枚举成员类型 */

    // 不带初始值的成员
    // 值为字符串字面量
    // 值为数字字面量
    // 所有枚举成员都满足以上任一条件的情况下，枚举成员可以作为类型使用

    enum Animals {
        Dog = 1,
        Cat = 'cat',
        Monkey = 2,
        Ribbit
    }

    interface Dog {
        type: Animals.Dog // 可以是Animals.Dog 或number
    }
    const dog: Dog = { type: Animals.Dog }
    dog.type = 2;

    interface Cat {
        type: Animals.Cat
    }
    const cat: Cat = { type: Animals.Cat } // 只可以是Animals.Cat

    /* 联合枚举类型 */

    enum SwitchStatus {
        OFF,
        ON
    }
    interface Light { status: SwitchStatus }

    const light: Light = { status: SwitchStatus.OFF }
    // light.status = Animals.Dog; // 不能将类型“Animals.Dog”分配给类型“SwitchStatus”。

    /* 运行时的枚举 */

    // enum 类型是可编译出实质内容的类型，运行时亦可生效
    // 不同于接口等定义 只在编译时可用，运行时无法生效

    /* const enum */

    const enum Statu2 {
        SUCCESS,
        WATING,
        FAILED
    }
    // 类似于接口，只在编译时生效的枚举类型，不会编译出实际代码
})()