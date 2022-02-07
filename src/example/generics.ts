/**
 * 泛型
 * 1. 简单使用
 */
const genGetArray = <T>(value: T, times: number = 5):T[] => {
    return new Array(times).fill(value);
}
console.log(genGetArray<string>('hello!', 3))
console.log(genGetArray<number>(10, 3))
/**
 * 2. 泛型变量
 */
const genGetArray2 = <T, U>(arg1: T, arg2: U, times: number): Array<[T, U]> => {
    return new Array(times).fill([arg1, arg2]);
}
/**
 * 这里会自动根据传参推断泛型的类型<number, string>
 */
genGetArray2(1, 'a', 3).forEach(item => {
    console.log(...item)
    // item[0].length // ERROR
    // item[1].toFixed() // ERROR
})

/**
 * 3. 泛型类型
 */

let genGetArray3: <T>(arg: T, times: number) => T[]
genGetArray3 = (arg: any, times = 5) => {
    return new Array(times).fill(arg);
}

// genGetArray3(123, 3).map(item => item.length) // ERROE

/**
 * 4. 泛型约束
 */
// 函数别名
type genGetArray4 = <T>(arg: T, times: number) => T[]

const getArray: genGetArray4 = (arg: any, times = 5) => {
    return new Array(times).fill(arg);
}
// 函数接口
interface GenGetArray5 {
    <T>(arg: T, times: number): T[]
}
// 外层泛型变量
interface GenGetArray6<T> {
    (arg: T, times: number): T[],
    data: T[]
}

/**
 * 5. 泛型约束中使用类型参数
 */
interface ValueWithLength {
    length: number
}

const genGetArray7 = <T extends ValueWithLength>(arg: T, times: number): T[] => {
    return new Array(times).fill(arg);
}

genGetArray7([1, 2, 3], 5);
genGetArray7('hello', 5);
// genGetArray7(10, 5); // ERROR
genGetArray7({
    length: 3
}, 5);

const getProps = <T, K extends keyof T>(object: T, propName: K) => {
    return object[propName];
}

getProps({a: 1, b: 'x'}, 'a')
// getProps({a: 1, b: 'x'}, 'c') // ERROR
