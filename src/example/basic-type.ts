/**
 * 基础类型
 */
/* 布尔类型 */
let bsBool: boolean;
bsBool = true;
// bool = 123 //不能将类型“number”分配给类型“boolean”。

/* 数值类型 */
let bsNum: number;
bsNum = 123;
// bsNum = 'abc' //不能将类型“string”分配给类型“number”。
bsNum = 0xff; // 十六进制
bsNum = 0o77; // 八进制
bsNum = 0b11; // 二进制

/* 字符串类型 */
let bsStr: string;
bsStr = 'abc';
// bsStr = true; //不能将类型“boolean”分配给类型“string”。
bsStr = `the num is ${bsNum}, the bool is ${bsBool}`;

/* 数组类型 */
// 写法1
let bsArr1: number[];
bsArr1 = [1, 2, 3];
// 写法2
let bsArr2: Array<number>
bsArr2 = [1, 2, 3]

/* 联合类型 */
// 1
let bsArr3: (number | string)[]
// 2
let bsArr4: Array<number | string>

bsArr3 = bsArr4 = ['1', 2, '3']

/* 元组类型 */
let bsTuple: [string, number, string, Array<string>];
bsTuple = ['1', 2, '3', ['4', '5']]

/* 枚举类型 */
/**
 * 自增序列号 默认从0开始自增
 * 只指定某一个的话，之前的还按照从0自增，之后按照定义值自增
 */
enum BsRoles {
    SUPER_ADMIN,// 0
    ADMIN = 3,
    USER// 4
}

/* any类型(anyScript) */
let bsValue: any;
bsValue = 'abc';
bsValue = 123;
bsValue = [1, '2', { a: '3', b: true }]

/* void类型(无类型) */
const bsTest1 = (text: string): void => {
    console.log(text);
}
let bsV: void;
bsV = undefined;
// 开启严格检查将会报错  "strict": true
bsV = null;

/* null 和 undefined */
let bsU: undefined = undefined;
let bsN: null = null;

/* never类型 */
const bsErrorFunc = (msg: string): never => {
    throw new Error(msg);
}

const bsInfiniteFunc = ():never => {
    const _num: number = 1;
    while (true) {
        console.log(_num)
    }
}

/* object类型 */
let bsObj1 = {
    name: 'gayhub'
};
let bsObj2 = bsObj1;
bsObj2.name = 'Gayhub';

function bsGetObject(obj: object): void {
    console.log(obj);
}

/* 类型断言与类型强转 */
const bsGetLength = (target: string | number): number => {
    if ((target as string).length || (target as string).length == 0) {
        return (target as string).length;
    } else {
        return target.toString().length;
    }
}