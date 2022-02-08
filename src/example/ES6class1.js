/**
 * ES6中的类
 */


(() => {
    /*ES5 和 ES6 实现创建实例*/
    /* ES5 */
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.getPostion = function () {
        return '(' + this.x + ', ' + this.y + ')';
    }
    var p1 = new Point(2, 3);
    console.log(p1, p1.getPostion());

    var p2 = new Point(4, 5);
    console.log(p2, p2.getPostion());

    /* ES6 constructor方法*/
    class Point2 {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            // return {a: 'a'} // 返回该实例不是该类的实例
        }
        getPostion() {
            return `(${this.x}, ${this.y})`
        }
    }

    /* 类的实例 */
    const p3 = new Point2(2, 3);
    console.log(p3, p3.getPostion());
    // Class constructor Point2 cannot be invoked without 'new'
    // const p4 = Point2(4, 5);
    console.log(p3.hasOwnProperty('getPostion'));
    console.log(p3.__proto__.hasOwnProperty('getPostion'))

    /* 取值函数和存值函数 */
    // ES5
    var info = {
        _age: 18,
        // setter
        set age(newValue) {
            if (newValue > 18) {
                console.log('too old!');
            } else {
                console.log('I\'m still young');
            }
        },
        // getter
        get age() {
            console.log('why get my age?');
            return this._age;
        }
    }

    console.log(info.age)
    info.age = 5
    info.age = 20

    /* ES6 */
    class Info {
        constructor(age) {
            this._age = age
        }
        // setter
        set age(newAge) {
            console.log(`my age is ${newAge}`);
            this._age = newAge
        }
        // getter
        get age() {
            console.log('why get my age?');
            return this._age;
        }
    }

    const info2 = new Info(18);
    console.log(info2.age)
    info2.age = 17
    console.log(info2.age)

    /* class表达式 */

    /* ES5 */
    const func1 = function () { }
    function func2() { }

    /* ES6 */
    const Class1 = class { }
    class Class2{ }

    /* 静态方法 */

    /* ES6 */
    class Point3 {
        constructor(x, y) { this.x = x, this.y = y }
        getPostion() { return `(${this.x}, ${this.y})` }
        static getClassName() { return Point3.name }
    }

    const point4 = new Point3(1, 2);
    // point4.getClassName() //ERROR not a function
    console.log(point4.getPostion(), Point3.getClassName())
    
    /* 实例属性其他写法 */
    
    class Point4 {
        z = 0;
        constructor(x, y) { this.x = x, this.y = y }
        getPostion() { return `(${this.x}, ${this.y})` }
        static getClassName() { return Point3.name }
    }
    /* 静态属性 */

    class Point5 {
        constructor(x) {
            this.x = x
        }
        static y = 2;
    }
    const point5 = new Point5(3);
    console.log(point5, point5.x, point5.y, Point5.y)

    /* 实现私有方法(折衷实现) */

    // 命名实现[君子语法]
    class Point6 {
        func1() {

        }
        _func2() {
            
        }
    }
    // 通过fun外置实现(bind, call, apply)[有效]
    const _fun2 = (a, b) => {console.log(a, b)}
    class Point7 {
        func1(...arg) {
            // DOSOME
            _fun2.apply(this, arg);
            _fun2.call(this, ...arg);
            _fun2.bind(this)(...arg);
            // DOSOME OTHER
        }
    }

    const point7 = new Point7()
    point7.func1('a', 'b');
    // Symbal 唯一值设置内部方法[半生效]
    const hidKey = Symbol('someValue');
    class Point8 {
        constructor(x) {
            this.x = x;
        }
        getPostion() {
            console.log(this.x)
        }
        [hidKey]() {
            console.log('private func')
        }
    }
    const point8 = new Point8();
    point8[hidKey]()

    // 通过之前学习的Reflect.ownKeys 和 Object.getOwnPropertySymbols 可以获取到
    console.log(Reflect.ownKeys(point8.__proto__))
    console.log(Object.getOwnPropertySymbols(point8.__proto__))
    point8[Object.getOwnPropertySymbols(point8.__proto__)[0]]()

    /* 类中的私有属性 */
    class Point9 {
        #privateValue = 12
        getPrivateValue() {
            return this.#privateValue;
        }
    }
    console.log(/* new Point9().#privateValue */ new Point9().getPrivateValue())

    /* new.target 返回使用的构造器 */

    function Point10() {
        // √
        console.log(new.target)
        // √
        this.show = () => {
            console.log(new.target)
        }
    }

    class Point11{
        // √
        constructor() { console.log(new.target) }
        show() {
            // 无法使用
            console.log(new.target)
        }
    }

    const point10 = new Point10(), point11 = new Point11();
    point10.show();
    point11.show();
    
    /* new.target在继承中的使用 */

    class parentClass {
        constructor() {
            if (new.target === parentClass) {
                throw new Error('Can\'t new this parent!')
            }
            console.log(new.target)
        }
    }

    class childrenClass extends parentClass{
        constructor() {
            super()
        }
    }

    try {
        const parentc = new parentClass()
    } catch (e) {
        console.error(e)
    }
    // 莫名其妙的产生了递归问题，为解决
    // const childc = new childrenClass()
})()