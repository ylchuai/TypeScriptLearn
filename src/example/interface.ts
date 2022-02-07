interface NameInfo {
    firstName: string,
    lastName: string
}

const getFullName = (({ firstName, lastName }: NameInfo) => {
    return `${firstName} ${lastName}`
});

getFullName({
    firstName: 'Gayhub',
    // lastName: {name: 'good'} //不能将类型“{ name: string; }”分配给类型“string”。
    lastName: 'Che'
});

interface Vegetable {
    color?: string, // 可选属性
    type: string,
    [prop: string]: any
}

const getVegetables = ({ color, type }:Vegetable) => {
    return `A ${color ? (color + ' ') : ''}${type}`;
};

getVegetables({
    color: 'red',
    type: 'tomato',
});

// 处理额外的属性

// 1. 利用 类型断言
getVegetables({
    type: 'tomato',
    size: 2
} as Vegetable);

// 2. 利用索引签名[prop: string]: any
getVegetables({
    type: 'tomato',
    size: 2
});

// 3. 利用类型兼容性

let twoRedTomato = {
    coloe:'red',
    type: 'tomato',
    [Symbol.for('fav')]: 'egg'
}

getVegetables(twoRedTomato);

// 利用接口设置只读属性

interface Book {
    name: string,
    readonly price: number,
    type: string
}

let book1: Book = {
    name: "Murder on the Orient Express",
    price: 19.99,
    type: "mystery story whodunit"
}

// book1.price = 21.99; // 无法分配到 "price" ，因为它是只读属性。

interface ArrInter {
    0: number,
    1: string,
    readonly 2: boolean
}

let arr1Inter: ArrInter = [0, '', false]
// arr1Inter[2] = true; // 无法分配到 "2" ，因为它是只读属性。

// 定义函数接口

// Interface has only a call signature — use
/*
interface AnyFunc{
    (num1: number, num2: number): number
};
*/
type AnyFunc = (num1: number, num2: number) => number;

// 接口定义对象的索引类型
interface RoleDic {
    [id: number]: string
    [id: string]: string
}

const role1: RoleDic = {
    '1': 'super_admin',
    2: 'admin'
}

// 接口的继承

/*
interface Vegetable {
    color?: string, // 可选属性
    type: string,
    [prop: string]: any
}
*/
/*
interface Tomato {
    color: string,
    type: string,
    smell: string
}
*/
interface Tomato extends Vegetable {
    smell: string
}

let tomato2: Tomato = {
    color: 'red',
    type: 'big',
    smell: 'sweet'
}

// 混合类型接口
interface Counter {
    (): void,
    count: number
}

const getCounter = (): Counter => {
    const counter = () => {
        counter.count++
    };
    counter.count = 0;
    return counter
}

const count: Counter = getCounter();
for (let a = 0; a < 5; a++) {
    count()
    console.log(count.count);
}
