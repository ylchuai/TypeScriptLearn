/**
 * 高级类型II
 */
(() => {
    /* 1. this类型 */
    class Counter {
        constructor(public count: number = 0) { }
        add(value: number) {
            this.count += value;
            return this;
        }

        subtract(value: number) {
            this.count -= value;
            return this;
        }
    }
    const counter = new Counter();
    counter.add(10);
    counter.subtract(3);
    console.log(counter.count)

    // tslint:disable-next-line:max-classes-per-file
    class PowCounter extends Counter {
        constructor() {
            super()
        }

        public pow(value: number) {
            this.count **= value;
            return this;
        }
    }
    const powCounter = new PowCounter();
    console.log(powCounter.add(2).pow(4).subtract(10).count)

    /* 2. 索引类型 */
    /* 2.1 索引类型查询操作符 */
    // keyof

    interface Info {
        name: string;
        age: number;
    }
    let infoProp: keyof Info;
    infoProp = 'name';
    infoProp = 'age';
    // infoProp = 'gender';

    function getValue<T, K extends keyof T>(obj: T, names: K[]): T[K][] {
        return names.map(bean => obj[bean]);
    }

    const info1: Info = {
        name: 'Che_Gayhub',
        age: 18
    }
    console.log(getValue(info1, ['name', 'age']))

    /* 2.2 索引访问操作符 */
    // [] 返回类型指定字段（索引）的类型

    type NameTypes = Info['name']; // string

    function getProperty<T, K extends keyof T>(obj: T, name: K): T[K] {
        return obj[name];
    }

    interface Objs<T> {
        // [key: number]: T
        [key: string]: T
    }
    const objs1: Objs<number> = {
        age: 10
    }

    // tslint:disable-next-line:prefer-const
    let _keys: keyof Objs<number>;
    Object.keys(objs1).forEach(bean => {
        _keys = bean;
    });

    interface Type {
        a: never;
        b: never;
        c: string;
        d: number;
        e: undefined;
        f: null;
        g: object;
    }

    type Test = Type[keyof Type] // string | number | object

    /* 3. 映射类型 */
    /* 3.1 基础 */
    // 借助旧类型创建新类型
    interface Info2 {
        age: number;
        name: string;
        gender: string;
    }
    interface ReadonlyInterface {
        readonly age: number;
        readonly name: string;
        readonly gender: string;
    }

    type ReadOnlyType<T> = {
        readonly [P in keyof T]: T[P] // ReadOnly映射
    }
    type PartialType<T> = {
        [P in keyof T]?: T[P] // Partial映射
    }
    type PickType<T, K extends keyof T> = {
        [P in K]?: T[P] // Pick映射
    }
    type RecodeType<T> = {
        [P in keyof T]?: T[P] // Partial映射
    }
    type ReadOnlyInfo2 = ReadOnlyType<Info2>;
    const info2: ReadOnlyInfo2 = {
        age: 18,
        name: 'Che_Gayhub',
        gender: 'male'
    }
    // 内置的映射类型
    // ReadOnly[只读] Partial[可选]
    // Pick[子集] Recode[转化]
    // info2.age = 10; // 只读
    interface Info3 {
        name: string,
        age: number,
        address: string
    }
    const info3: Info3 = {
        name: 'Che_gayhub',
        age: 18,
        address: 'Tianjin'
    }

    function pick<T, K extends keyof T>(obj: T, keys: K[]): PickType<T, K> {
        const res: any = {};
        keys.forEach(key => { res[key] = obj[key] });
        return res;
    }

    const nameAndAddress = pick(info3, ['name', 'address']);
    console.log(nameAndAddress)

    // 将类型 Record<number, string> 转化为 Record<number, number>
    function mapObject<K extends string | number, T, U>(
        obj: Record<K, T>, f: (x: T) => U
    ): Record<K, U> {
        const res: any = {};
        // tslint:disable-next-line:forin
        for (const key in obj) {
            res[key] = f(obj[key]);
        }
        return res;
    }

    const _names = { 0: 'hello', 1: 'world', 2: 'bye' }
    const length = mapObject(_names, (s) => s.length);
    console.log(length)
    // 同态：两个代数结构之间的保持结构不变的映射
    // ReadOnly Partial Pick 为同态的
    // Recode为非同态

    /* 3.2 由映射类型进行推断 */

    // 映射封包
    type Proxy<T> = {
        get(): T,
        set(value: T): void
    }
    type Proxify<T> = {
        [P in keyof T]: Proxy<T[P]>
    }
    function proxify<T>(obj: T): Proxify<T> {
        const result = {} as Proxify<T>;
        // tslint:disable-next-line:forin
        for (const key in obj) {
            result[key] = {
                get: () => obj[key],
                set: (value) => obj[key] = value
            }
        }
        return result;
    }

    const props = {
        name: 'Che',
        age: 18,
    }

    const proxyProps = proxify(props);
    proxyProps.name.set('Gayhub');

    // 映射拆包
    function unproxify<T>(t: Proxify<T>): T {
        const result = {} as T;
        // tslint:disable-next-line:forin
        for (const k in t) {
            result[k] = t[k].get();
        }
        return result;
    }
    const originalProps = unproxify(proxyProps);
    console.log(originalProps)

    /* 3.3 增加或移除特定修饰符 */

    // 通过在修饰符前增加"+","-"符合来实现增加/移除该修饰符
    // 默认为增加修饰符
    type RemoveReadonlyInfo2<T> = {
        -readonly [P in keyof T]: T[P]
    }

    type InfoWithoutReadonly = RemoveReadonlyInfo2<ReadOnlyInfo2>;

    /* 3.4 keyof和映射类型在2.9版本的升级 */

    const stringIndex = 'a';
    const numberIndex = 1;
    const symbolIndex = Symbol()
    type Objs2 = {
        [stringIndex]: string,
        [numberIndex]: number,
        [symbolIndex]: symbol
    }
    type keysType = keyof Objs2;

    type ReadonlyTypes<T> = {
        readonly [P in keyof T]: T[P]
    }

    const Objs3: ReadonlyTypes<Objs2> = {
        a: 'aa',
        1: 11,
        [symbolIndex]: Symbol()
    }
    // Objs3.a = 'bb'; // 无法分配到 "a" ，因为它是只读属性。

    /* 3.5 元组和数组上的映射类型 */

    type MapToPrmise<T> = {
        [K in keyof T]: Promise<T[K]>
    }

    type Tuple = [number, string, boolean]
    type promiseTuple = MapToPrmise<Tuple>
    const tuple1: promiseTuple = [
        new Promise((resolve, reject) => resolve(1)),
        new Promise((resolve, reject) => resolve('a')),
        new Promise((resolve, reject) => resolve(false)),
    ]

    /* 3.6 unknown */
    // TS3.0中新增的顶级类型，相对any来说是安全的
    /* 3.6.1 任何类型的值都可以赋值给unknown */
    let value1: unknown;
    value1 = 'a';
    value1 = null;
    value1 = () => {/* some */ };
    /*
    3.6.2 在没有类型断言或基于控制流的类型细化时
    unknow不可以赋值给其他类型
    此时它只能赋值给unknown和any类型
    */
    // tslint:disable-next-line:prefer-const
    let value2: unknown;
    // tslint:disable-next-line:prefer-const
    // let strval: string = value2; // 不能将类型“unknown”分配给类型“string”。
    value1 = value2;
    /*
    3.6.3 如果没有类型断言或基于控制流的类型细化时
    不能在它上面进行任何操作
    */
    // tslint:disable-next-line:prefer-const
    let value4: unknown = 1;
    // value4 += 1;
    (value4 as number) += 1;

    /* 3.6.4 unkunow与其他类型组成的交叉类型都等于其他类型 */

    type type1 = string & unknown; // string
    type type2 = boolean | number & unknown; // string

    /* 3.6.5 unkunow与除any外其他类型组成的联合类型都等于unkunow类型 */

    type type3 = boolean | unknown; // unknown
    type type4 = any | unknown; // any

    /* 3.6.6 never是unknown类型的子类型 */

    type type5 = never extends unknown ? true : false;

    /* 3.6.7 keyof unknow类型为never */

    type type6 = keyof unknown;

    /* 3.6.8 只能对unkunow进行等于或不等于操作，不能进行其他操作 */

    console.log(value1 === value2)
    console.log(value1 !== value4);

    /*
    3.6.9 unkunow类型的值不能访问其属性，
    也不能作为函数调用，
    或作为类创建实例
    */

    /* 3.6.X 使用映射类型时，如果便利的unknown类型则不会映射任何实例 */
    type Type1<T> = {
        [P in keyof T]: T[P]
    }
    type type7 = Type1<unknown>;

    /* 4. 条件类型 */
    /* 4.1 基础 */
    // T extends U ? X : Y
    type Type2<T> = T extends string ? string : number;
    // tslint:disable-next-line:prefer-const
    let indexStr: Type2<'a'>;
    // tslint:disable-next-line:prefer-const
    let indexNum: Type2<1>;

    /* 4.2 分布式条件类型 */

    type TypeName<T> = T extends string ? string :
        T extends number ? number :
        T extends boolean ? boolean :
        T extends undefined ? undefined :
        T extends ()=>any ? ()=>any : object;
    // tslint:disable-next-line:prefer-const
    type index3 = TypeName<string | number>;

    type Diff<T, U> = T extends U ? never : T;
    type test = Diff<string | number | boolean, undefined | number>;

    // 条件类型 与 映射类型
    type Type3<T> = {
        // tslint:disable-next-line:ban-types
        [K in keyof T]: T[K] extends Function ? K : never;
    }[keyof T]
    interface Part {
        id: number,
        name: string,
        subparts: Part[],
        undatePart(newName: string): void
    }
    type test2 = Type3<Part>

    /* 4.3 条件类型的类型推断 */

    // infer Array<infer U> (infer U)[]
    type Type4<T> = T extends any[] ? T[number] : T
    type type8 = Type4<string[]>;

    type Type5<T> = T extends Array<infer U> ? U : T
    type type9 = Type5<string[]>;

    /* 4.4 TS预设条件类型 */
    // Exclude<T, U> 取T 与 U 的差集
    type type10 = Exclude<'a' | 'b' | 'c', 'a'>
    // Extract<T, U> 取T 与 U 的交集
    type type11 = Extract<'a' | 'b' | 'c', 'a' | 'c'>
    // NonNullable<T> 去除T中的 null 和 undefined
    type type12 = NonNullable<string | boolean | null | void>
    // ReturnType<T extends Function>
    type type13 = ReturnType<() => string>
    // InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any>
    // 获取构造函数类型的实例类型
    // tslint:disable-next-line:max-classes-per-file
    class Aclass {
        constructor() {/* */};
    }
    type type14 = InstanceType<typeof Aclass>
    type type15 = InstanceType<any>
    type type16 = InstanceType<never>
    type type17 = InstanceType<typeof String>
})()