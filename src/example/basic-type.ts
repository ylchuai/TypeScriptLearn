// 布尔类型
let bool: boolean;
bool = true;
// bool = 123 //不能将类型“number”分配给类型“boolean”。

// 数值类型
let num: number;
num = 123;
// num = 'abc' //不能将类型“string”分配给类型“number”。
num = 0xff; // 十六进制
num = 0o77; // 八进制
num = 0b11; // 二进制

// 字符串类型
let str: string;
str = 'abc';
// str = true; //不能将类型“boolean”分配给类型“string”。
str = `the num is ${num}, the bool is ${bool}`;

// 数组类型
// 写法1
let arr1: number[];
arr1 = [1, 2, 3];
// 写法2
let arr2: Array<number>
arr2 = [1, 2, 3]
// 联合类型
// 1
let arr3: (number | string)[]
// 2
let arr4: Array<number | string>

arr3 = arr4 = ['1', 2, '3']

// 元组类型
let tuple: [string, number, string, Array<string>];
tuple = ['1', 2, '3', ['4', '5']]

// 枚举类型
/**
 * 自增序列号 默认从0开始自增
 * 只指定某一个的话，之前的还按照从0自增，之后按照定义值自增
 */
enum Roles {
    SUPER_ADMIN,// 0
    ADMIN = 3,
    USER// 4
}

// any类型(anyScript)
let value: any;
value = 'abc';
value = 123;
value = [1, '2', { a: '3', b: true }]

// void类型(无类型)
const test1 = (text: string): void => {
    console.log(text);
}
let v: void;
v = undefined;
// 开启严格检查将会报错  "strict": true
// v = null;

// null 和 undefined
let u: undefined = undefined;
let n: null = null;

// never类型
const errorFunc = (msg: string): never => {
    throw new Error(msg);
}

const infiniteFunc = ():never => {
    const _num: number = 1;
    while (true) {
        console.log(_num)
        // yield num++;
    }
}

// object类型
let obj1 = {
    name: 'gayhub'
};
let obj2 = obj1;
obj2.name = 'Gayhub';

function getObject(obj: object): void {
    console.log(obj);
}

// 类型断言与类型强转
const getLength = (target: string | number): number => {
    if ((target as string).length || (target as string).length == 0) {
        return (target as string).length;
    } else {
        return target.toString().length;
    }
}