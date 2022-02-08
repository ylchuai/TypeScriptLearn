/**
 * Symbol
 */
(() => {
    /* 1. Symbol值[ES6] */
    const s = Symbol();
    console.log(s)
    const s2 = Symbol();
    console.log(s2)
    console.log('s1 == s2', typeof s, typeof s2)

    /* 2. Symbol 标识 */

    // tslint:disable-next-line:one-variable-per-declaration
    const s3 = Symbol('gayhub'),
        s4 = Symbol('gayhub');

    console.log(s3, s4)
    // ts 中Symbol传参只能是string | number
    // Symbol 不能参与数字运算
    console.log(s3.toString())
    console.log(Boolean(s4))
    console.log(!s3)

    /* 3: 对象的变量属性名, Symbol作为对象属性名 */
    const porp = 'name';
    const info = {
        [`my` + porp]: 'gayhub'
    }
    console.log(info)

    const s5 = Symbol('name');
    const info2 = {
        [s5]: 'gayhub',
        sex: 'male',
        age: '66'
    };
    console.log(info2);
    info2[s5] = 'che_gayhub';

    /* 4. 变量对象的属性名，如何获取Symbol属性 */
    // 以下四种不可获取Symbol
    // tslint:disable-next-line:forin
    for (const key in info2) {
        // tslint 报错解决方案
        // if (info2.hasOwnProperty(key)) {
        //     console.log(key)
        // }
        console.log(key)
    }

    console.log(Object.keys(info2))

    console.log(Object.getOwnPropertyNames(info2))

    console.log(JSON.stringify(info2))

    // 以下两种可以获取Symbol

    console.log(Object.getOwnPropertySymbols(info2))

    console.log(Reflect.ownKeys(info2))

    /* 5. Symbol的标识复用 */
    const s6 = Symbol('gayhub');
    const s7 = Symbol.for('gayhub');
    const s8 = Symbol.for('gayhub');
    const info3 = {
        [s7]: 'coder'
    }
    console.log(info3[s8])// coder
    console.log(Symbol.keyFor(s7), Symbol.keyFor(s8), Symbol.keyFor(s6));

    /* 6. 11个内置Symbol值 */
    // 6.1
    // Symbol.hasInstance; // 指令instanceof会调用对象的该属性的方法

    const info4 = {
        [Symbol.hasInstance](otherObj: object) {
            console.log(otherObj);
        }
    }
    console.log({ a: 'a' } instanceof (info4 as any))


    // 6.2
    // Symbol.isConcatSpreadable // 数组在执行concat时是否进行扁平化

    const arr: number[] = [1, 2];
    console.log(arr.concat([3, 4]))
    arr[Symbol.isConcatSpreadable] = false;
    console.log(arr.concat([3, 4]));


    // 6.3
    // Symbol.species // 指定创建衍生对象的构造函数
    class C extends Array {
        getName() {
            return 'gayhub'
        }
        [Symbol.species]() {
            return Array
        }
    }
    const c1 = new C(3);
    c1.fill(1);
    console.log('c1', c1);

    const a = c1.map(item => {
        console.log(item);
        return item + 1;
    });
    console.log('a', a);

    console.log('c1 instanceof C', c1 instanceof C,
        '\nc1 instanceof Array', c1 instanceof Array);

    console.log('a instanceof C', a instanceof C,
        '\na instanceof Array', a instanceof Array);

    // 6.4
    // Symbol.match
    // Symbol.replace
    // Symbol.search
    // Symbol.split
    // string 调用 对应方法时会调用参数中的该方法
    // 并将返回值作为结果返回出来

    const obj3 = {
        [Symbol.match](...arg) {
            console.log('match', arg)
            return arg[0].length
        },
        [Symbol.replace](...arg) {
            console.log('replace', arg)
            return arg[0].length
        },
        [Symbol.search](...arg) {
            console.log('search', arg)
            return arg[0].length
        },
        [Symbol.split](...arg) {
            console.log('split', arg)
            return arg[0].length
        }
    }
    console.log('abcde'.match(obj3)) // match ['abcde']
    console.log('abcde'.replace(obj3, '123')) // replace (2) ['abcde', '123']
    console.log('abcde'.search(obj3)) // search ['abcde']
    console.log('abcde'.split(obj3)) // split (2) ['abcde', undefined]


    // 6.5
    // Symbol.iterator // 数组属性 作为该数组的默认迭代器方法

    const Array2: number[] = [1, 2, 3];
    const it = Array2[Symbol.iterator]();
    console.log(it);
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());


    // 6.6
    // Symbol.toPrimitive
    // 作为对象的一个方法属性，对象被转为原始类型值时会调用该方法

    const obj4: unknown = {
        [Symbol.toPrimitive](type): number {
            console.log(type);
            return 0
        }
    }
    console.log((obj4 as any)++)


    // 6.7
    // Symbol.toStringTag
    // 它通常作为对象的属性键使用，
    // 对应的属性值应该为字符串类型，
    // 这个字符串用来表示该对象的自定义类型标签

    const obj5: unknown = {
        [Symbol.toStringTag]: 'gayhub'
    }
    // 作为方法属性使用时的写法
    // tslint:disable-next-line:max-classes-per-file
    class C2 {
        get [Symbol.toStringTag]() {
            return 'gayhub';
        }
    }
    const obj6 = new C2();
    console.log(obj5.toString(), obj6.toString());



    // Symbol.unscopables
    // 在with使用中，哪些属性会被过滤掉
    const obj7 = {
        a: 'obj_a',
        b: 'obj_b'
    }

    console.log(obj7[Symbol.unscopables])

    console.log(Array.prototype[Symbol.unscopables])

})()