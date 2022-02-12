/* 高级类型 */
(() => {
    /* 1. 交叉类型 */

    const mergeFunc = <T, U>(arg1: T, arg2: U): T & U => {
        const res: T & U = Object.assign(arg1, arg2);
        return res;
    }
    // tslint:disable-next-line:no-unused-expression
    // mergeFunc({ a: '1' }, { b: 'x'}).c // × 不存在属性“c”。

    /* 联合类型 */

    interface LengthAble {
        length: number
    }
    const getLengthFunc = (content: string | number | object): number => {
        if (typeof content == 'string') return content.length;
        else return content.toString().length;
    }
    console.log(getLengthFunc('123'));
    console.log(getLengthFunc({ length: 10 }));
    console.log(getLengthFunc(999));

    /* 类型保护 */

    const valueList = [123, 'abc'];
    const getRandomValue = () => {
        const num = Math.random() * 10;
        return valueList[Math.floor(num / 5)]
    }
    const item = getRandomValue();
    if ((item as string).length) {
        console.log((item as string).length);
    } else {
        console.log((item as number).toFixed());
    }

    // 定义一个函数类型保护
    function isString(value: number | string): value is string {
        return typeof value === 'string';
    }

    if (isString(item)) {
        console.log(item.length);
    } else {
        console.log(item.toFixed());
    }

    // 使用typeof类型保护
    /*
     * 使用条件：
     *
     * 1. 只能使用 == != === !==
     * 2. 如 includes 等判断无效
     * 3. 只能保护 string/number/boolean/symbol
     */

    if (typeof item === 'string') {
        console.log(item.length);
    } else {
        console.log(item.toFixed());
    }

    // 使用instanceof类型保护

    // tslint:disable-next-line:max-classes-per-file
    class CreateByClass1 {
        public age = 18;
    }
    // tslint:disable-next-line:max-classes-per-file
    class CreateByClass2 {
        public name = 'Gyahub'
    }

    const itemList = [new CreateByClass1(), new CreateByClass2()];

    function getRandomItem() {
        const num = Math.random() * 10;
        return itemList[Math.floor(num / 5)]
    }
    const item2 = getRandomItem();
    if (item2 instanceof CreateByClass1) {
        console.log('CreateByClass1', item2.age)
    } else {
        console.log('CreateByClass2', item2.name)
    }

    /* null和undefined */

    // 非严格模式下 undefined可以赋值给部分类型
    // tslint:disable-next-line:prefer-const
    let strvalue = 'str';
    // strvalue = undefined; // 非严格模式 √

    // 严格模式下 "strictNullChecks": true
    // 可选参数会默认变成 类型|undefined 的联合类型
    const sumFunc = (arg1: number, arg2?: number) => {
        return arg1 + (arg2 ?? 0);
    }

    console.log(sumFunc(5), sumFunc(5, 6));

    /* 类型保护和类型断言 */

    // 严格模式下 一个值若即可为为undefined也可以为string
    // 必须手动声明为一个联合类型

    const getLengthFunc2 = (value: string | null): number => {
        return (value ?? '').length
    }

    function getSpliceStr(num: number | null): string {
        function getRes(prefix: string) {
            // num! 标识 num不为null
            return prefix + num!.toFixed().toString()
        }
        num = num ?? 0.1;
        return getRes('Che_')
    }
    console.log(getSpliceStr(1.2))

    /* 类型别名 */

    type TypeString = string;
    const strvalue1: TypeString = '';

    type PositionType<T> = { x: T, y: T }
    const position1: PositionType<number> = {
        x: 1,
        y: -1
    }

    const position2: PositionType<string> = {
        x: 'left',
        y: 'top'
    }
    /* 类型别名可以在*属性*中引用自己 */
    type Tree<T> = {
        current: T,
        child?: Tree<T>[]
    }

    const tree: Tree<string> = {
        current: 'root',
        child: [
            {
                current: 'child_node',
                child: [{
                    current: 'leaf'
                }]
            }
        ]
    }

    // 为接口或类声明别名时*不可以*使用implement和extends

    type Alias = { num: number }
    interface AliasInter{ num: number }
    const _alias: Alias = { num: 10 }
    const _aliasInter = _alias;

    // 类型需要拓展时应使用接口
    // 临时使用时应使用类型别名

    /* 字面量类型 */

    // 字符串字面量

    type Name = 'Che';
    const name1: Name = 'Che';
    // const name2: Name = 'Gayhub'; // 不能将类型“"Gayhub"”分配给类型“"Che"”

    type Direction = 'north' | 'east' | 'south' | 'west'
    function getDirection(direction: Direction) {
        return direction[0];
    }
    console.log(getDirection('west'))

    // 数字字面量

    type State = -1 | 0 | 1 | 2 | 3;
    interface ReturnMsg {
        msg: string,
        code: State
    }
    const returnMsg: ReturnMsg = {
        msg: 'success',
        code: 1
    }
    /* 枚举成员类型 */

    // 条件
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

    /* 可辨识联合 */
    // 1. 单例类型 【枚举成员类型和字面量类型】
    // 2. 联合类型
    // 3. 类型别名
    // 4. 类型保护
    // 合并称为 可辨识联合/标签联合/代数数据类型

    /* 辨识特征： 具有普通的单例类型属性 */
    /* 类型别名包含了哪些类型的联合 */

    interface Square {
        kind: 'square',
        size: number
    }

    interface Ractangle {
        kind: 'rectangle',
        height: number,
        width: number
    }

    interface Circle {
        kind: 'circle',
        radius: number
    }

    type Shape = Square | Ractangle | Circle;
    function assertNever(value: never): never {
        throw new Error('Unexpected Object: ' + value);
    }
    function getArea(s: Shape):number {
        switch (s.kind) {
            case 'square': return s.size ** 2; break;
            case 'rectangle': return s.height * s.width; break;
            case 'circle': return Math.PI * s.radius ** 2; break;
            default:
                return assertNever(s);
        }
    }
    // 完整性检查
    // 1. 利用 strictNullChecks 若缺少分支，返回值为undefined
    // 2. 使用 never 类型 比较通用
})()