/**
 * 接口
 */
(() => {
    /* 1. 基本用法 */
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

    /* 2. 可选属性 与 索引签名 */
    interface Vegetable {
        color?: string, // 可选属性
        type: string,
        // 索引签名
        [prop: string]: any
    }

    const getVegetables = ({ color, type }:Vegetable) => {
        return `A ${color ? (color + ' ') : ''}${type}`;
    };

    getVegetables({
        color: 'red',
        type: 'tomato',
    });

    /* 3. 多余属性检查与规避检查 */

    // 3.1. 利用 类型断言
    getVegetables({
        type: 'tomato',
        size: 2
    } as Vegetable);

    // 3.2. 利用索引签名[prop: string]: any
    getVegetables({
        type: 'tomato',
        size: 2
    });

    // 3.3. 利用类型兼容性

    const twoRedTomato = {
        coloe:'red',
        type: 'tomato',
        [Symbol.for('fav')]: 'egg'
    }

    getVegetables(twoRedTomato);

    /* 4. 只读属性 */

    interface Book {
        name: string,
        readonly price: number,
        type: string
    }

    const book1: Book = {
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

    const arr1Inter: ArrInter = [0, '', false]
    // arr1Inter[2] = true; // 无法分配到 "2" ，因为它是只读属性。

    /* 5. 接口定义函数类型 */

    // 设置rule "callable-types": [false]
    interface AnyFunc1{
        (num1: number, num2: number): number
    };
    type AnyFunc2 = (num1: number, num2: number) => number;

    /* 6. 接口定义对象的索引类型[索引签名] */
    interface RoleDic {
        [id: number]: string
        [id: string]: string
    }

    const role1: RoleDic = {
        '1': 'super_admin',
        2: 'admin'
    }

    /* 7. 接口的继承 */

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

    const tomato2: Tomato = {
        color: 'red',
        type: 'big',
        smell: 'sweet'
    }

    /* 8. 混合类型接口 */
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

})()