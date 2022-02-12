/**
 * 类型推论
 */
(() => {
    /* 类型推论 */
    /* 1.1 基础 */

    let _name = 'Che';
    // _name = 123; //不能将类型“number”分配给类型“string”。
    _name = 'Gayhub'; // √

    /* 1.2 多类型联合 */

    let arr1 = [1, 'a']; // (string | number)[]

    arr1 = [2, 'b'] // √

    arr1 = [2, 3] // √

    /* 1.3 上下文类型 */

    window.onmousedown = (ev) => {
        console.log(ev);
    }

    /* 类型兼容性 */

    /* 2.1 基础 */

    interface Infos {
        name: string
    }
    let info: Infos;

    const info1 = { name: 'Che' }
    const info2 = { age: 18 }
    const info3 = { name: 'Che', age: 18 };
    info = info1;
    // info = info2; // 类型 "{ age: number; }" 中缺少属性 "name"，但类型 "Infos" 中需要该属性。
    info = info3;
    // console.log(info.age); // 类型“Infos”上不存在属性“age”。

    /* 2.2 函数兼容性 */

    /* 2.2.1 参数个数 */

    // tslint:disable-next-line:prefer-const
    let x = (a: number) => a;
    let y = (a: number, b: string) => a;

    // x = y
    y = x; // √

    /* 2.2.2 参数类型 */

    // tslint:disable-next-line:prefer-const
    let x1 = (a: string[]) => console.log(a)
    // tslint:disable-next-line:prefer-const
    let y1 = (a: (string | number)[]) => console.log(a)

    x1 = y1;
    y1 = x1; // √

    /* 2.2.3 返回值类型 */

    // tslint:disable-next-line:prefer-const
    let x2 = (a: number) => a;
    // tslint:disable-next-line:prefer-const
    let y2 = (a: number) => a > 10 ? '' + a : a;

    // x2 = y2;
    y2 = x2; // √

    /* 2.2.4 可选参数和剩余参数 */

    const getSum = (
        arr: number[],
        cb: (...arg: number[]) => number,
        base?: number
    ) => {
        return cb(...arr, base ? base : 0);
    }

    let res = getSum([1, 2], (...args) => {
        return args.reduce((pre, value) => pre + value, 0);
    })
    console.log(res);
    res = getSum([1, 2], (...args) => {
        return args.reduce((pre, value) => pre + value, 0);
    }, 10)
    console.log(res);

    /* 2.2.5 参数双向协变 */
    /**
     * 协变与逆变(covariance and contravariance)是在计算机科学中，
     * 描述具有父/子型别关系的多个型别通过型别构造器、构造出的
     * 多个复杂型别之间是否有父/子型别关系的用语。
     */
    class Parent {
        // SomeThing
    }
    // tslint:disable-next-line:max-classes-per-file
    class Child extends Parent {
        // SomeThine
    }

    interface C2C {
        (param: Child): Child;
    }
    interface C2P {
        (param: Child): Parent;
    }
    interface P2C {
        (param: Parent): Child;
    }
    interface P2P {
        (param: Parent): Parent;
    }
    let fun1: C2C = child => child;
    let fun2: C2P = child => child;
    let fun3: P2C = child => child;
    let fun4: P2P = child => child;

    fun1 = fun2
    fun2 = fun1
    fun1 = fun3
    fun3 = fun1
    fun1 = fun4
    fun4 = fun1

    /* 2.2.6 函数重载 */

    function merge(arg1: number, arg2: number): number
    function merge(arg1: string, arg2: string): string
    function merge(arg1, arg2) {
        return arg1 + arg2;
    }

    function sum(arg1: number, arg2: number): number
    function sum(arg1, arg2) {
        return arg1 + arg2;
    }

    // tslint:disable-next-line:prefer-const
    let fun5 = merge;
    // tslint:disable-next-line:prefer-const
    let fun6 = sum;
    fun6 = fun5 // √
    // fun5 = fun6 // ×

    /* 2.3 枚举 */

    enum SWITCH {
        ON,
        OFF
    }
    enum STATUS {
        WATING,
        SUCCESS,
        FAILE
    }
    let s = SWITCH.ON;
    s = 1;
    // s = STATUS.WATING; // ×

    /* 2.4 类 */

    // tslint:disable-next-line:max-classes-per-file
    class Animal {
        constructor(public name: string) { }
    }
    // tslint:disable-next-line:max-classes-per-file
    class Person {
        public age: number;
        constructor(public name: string) { }
    }
    // tslint:disable-next-line:max-classes-per-file
    class Food {
        constructor(public name: number) { }
    }

    // tslint:disable-next-line:prefer-const
    let animal1: Animal;
    // tslint:disable-next-line:prefer-const
    let person1: Person;
    // tslint:disable-next-line:prefer-const
    let food1: Food;
    animal1 = person1; // √可以舍弃部分属性
    // person1 = food1; // × food缺少成员属性
    // food1 = animal1; // × food成员属性类型不一致

    /* private protected */
    // tslint:disable-next-line:max-classes-per-file
    class Parent1 {
        private age: number;
    }
    // tslint:disable-next-line:max-classes-per-file
    class Child1 extends Parent1{
        constructor() {
            super()
        }
    }

    // tslint:disable-next-line:max-classes-per-file
    class Other {
        private age: number;
    }

    const children1: Parent1 = new Child1()
    // const other: Parent1 = new Other() // × 类型具有私有属性“age”的单独声明。

    /* 2.5 泛型 */

    // tslint:disable-next-line:no-empty-interface
    interface Data<T> {
        data: T
    }
    // tslint:disable-next-line:prefer-const
    let data1: Data<number>;
    // tslint:disable-next-line:prefer-const
    let data2: Data<string>;
    // data1 = data2; // × 不能将类型“string”分配给类型“number”。
    // data2 = data1; // × 不能将类型“number”分配给类型“string”。
})()