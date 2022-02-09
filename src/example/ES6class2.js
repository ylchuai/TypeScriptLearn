/**
 * 类的继承
 */
(() => {
    /* 1. ES5中的继承 */

    function Food() {
        this.type = 'food'
    }
    Food.prototype.getType = function () {
        return this.type
    }

    function Vegetables(name) {
        this.name = name;
    }

    Vegetables.prototype = new Food();
    Vegetables.prototype.constrctor = Vegetables

    const food1 = new Vegetables('tomato');
    console.log(food1, food1.getType(), food1 instanceof Food)
    
    /* 2. ES6中的继承 */

    class Food1 {
        static some = 'Some';
        constructor(type = 'food') {
            console.log('Food')
            this.type = type;
        }
        static getType() {
            return this.some
        }
    }
    class Vegetables1 extends Food1{
        constructor(type, name) {
            console.log('Vegetables')
            super(type);
            this.name = name;
        }
    }

    const tomato2 = new Vegetables1('vegetable', 'tomato')
    console.log(tomato2, Vegetables1.getType())
    console.log('tomato2 instanceof Food1',tomato2 instanceof Food1)
    console.log('tomato2 instanceof Vegetables1',tomato2 instanceof Vegetables1)

    /* 3. Objct.getPrototypeOf */

    // 获取父类
    console.log(Object.getPrototypeOf(Vegetables1) === Food1)

    /* 4. super */
    /* 4.1. super函数 */

    // 作为函数时，代表父类的constructor(构造器)，只能在constructor中使用

    /* 4.2. super对象 */

    // 普通方法中 指向父类原型对象
    // 静态方法中 指向父类
    class Parent {
        constructor() {
            this.type = 'parent';
            this.name = 'pName';
        }
        print() {
            console.log(this.name)
        }
        getName() {
            return this.type;
        }
    }

    Parent.getType = () => {
        return 'is parent';
    }

    class Child extends Parent {
        constructor() {
            super()
            this.name = 'child'
            console.log('constructor', super.getName())
        }

        childPrint() {
            super.print();
        }

        getParentName() {
            console.log('getParentName', super.getName())
        }

        getParentType() {
            // console.log('getParentType', super.getType()) // ERROR super.getType === undefined
        }

        static getParentType2() {
            console.log('getParentType2', super.getType())
        }
    }

    const children = new Child() // constructor parent

    children.getParentName() // getParentName parent
    children.getParentType() 

    Child.getParentType2() // getParentType2 is parent

    children.childPrint() // child

    /* 5. 类的prototype属性和__proto__属性 */

    // 对象的__proto__属性默认指向构造器的prototype

    const obj = new Object();
    console.log(obj.__proto__ === Object.prototype); // true

    // 子类的prototype属性的__proto__指向父类的prototype属性
    // 实例的__proto__属性的__proto__指向父类实例的__proto__

    /* 原生构造函数的继承 */
    /* 原生构造函数
    Boolean
    Number
    String
    Array
    Date
    Function
    RegExp
    Error
    Object
    */

    class CustomArray extends Array {
        constructor(...arg) {
            super(...arg)
        }
    }

    const myArray = new CustomArray(3);
    console.log(myArray.fill('+'))
    console.log(myArray.join('-'))
    const myArray2 = new CustomArray(1, 2, 3);
    console.log(myArray2.join('-'))
})()