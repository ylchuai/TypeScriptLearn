
/**
 * 函数
 */
(() => {
    /**
     * 1 函数类型
     * 1.1 为函数定义类型
     */

    function add(arg1: number, arg2: number): number {
        return arg1 + arg2
    }

    const add2 = (arg1: number, arg2: number): number => arg1 + arg2;


    /* 1.2 完整的函数类型 */

    let add3: (x: number, y: number) => number;
    add3 = (arg1, arg2) => arg1 + arg2;

    /* 1.3 使用接口定义函数类型 */

    // interface Add {
    //     (
    //         x: number, y: number
    //     ):number
    // }

    /* 1.4 使用类型别名 */

    type Add = (x: number, y: number) => number

    /**
     * 2 参数
     */
    /* 2.1 可选参数 */

    type Addfun1 = (arg1: number, arg2: number, arg3?: number) => number
    const addfun1: Addfun1 = (arg1, arg2) => arg1 + arg2
    console.log(addfun1(1, 2, 3))
    const addfun2: Addfun1 = (arg1, arg2, arg3) => (arg1 + arg2) * arg3
    console.log(addfun2(1, 2, 3))

    /* 2.2 默认参数 */

    const addfun3 = (x: number, y: number, z: number = 1) => (x + y) * z
    const addfun4: Addfun1 = (x, y = 0) => x + y

    /* 2.3 剩余参数 */

    // ES5
    // function handleData() {
    //     if (arguments.length === 1) return arguments[0] * 2;
    //     else if (arguments.length === 2) return arguments[0] * arguments[1];
    //     else if Array.prototype.slice.apply(arguments as Array<any>).join('_');
    // }

    const handleData1 = (arg: number, ...args: number[]): void => {
        // TODO:
    }

    /**
     * 3 重载
     */

    // ------------重载部分------------
    function handleData2(x: string): string[]
    function handleData2(x: number): number[]
    // ------------实体部分------------
    function handleData2(x: any): any {
        if (typeof x === 'string') {
            return x.split('');
        } else {
            return [x - 1, x, x + 1]
        }
    }

    console.log(handleData2('hello'))
    console.log(handleData2(123))

})()