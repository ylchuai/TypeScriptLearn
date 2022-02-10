/**
 * TS中的类
 */
(() => {
    /* 基础 */
    class Point {
        x: number
        y: number
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        getPosition():string {
            return `(${this.x}, ${this.y})`
        }
    }

    const point = new Point(1, 2);
    console.log(point.getPosition())

    // tslint:disable-next-line:max-classes-per-file
    class Parent {
        public name: string
        constructor(name: string) {
            this.name = name;
        }
    }
    // tslint:disable-next-line:max-classes-per-file
    class Child extends Parent{
        constructor(name: string) {
            super(name);
        }
    }
    /* 修饰符 */
    // 1. public
    // 2. private
    // 3. protected

    enum Gender{
        male = 1,
        female
    }

    // tslint:disable-next-line:max-classes-per-file
    class Parent2 {
        public name: string
        private age: number = 18;
        protected gender: number;
        constructor(name: string, age: number, gender: number) {
            this.name = name;
            this.age = age;
            this.gender = gender;
        }
    }
    const p = new Parent2('Jack', 18, Gender.male);
    console.log(p.name)
    // console.log(Gender[p.gender]) // 属性“gender”受保护，只能在类“Parent2”及其子类中访问。
    // console.log(p.age); // 属性“age”为私有属性，只能在类“Parent2”中访问。

    // tslint:disable-next-line:max-classes-per-file
    class Child2 extends Parent2{
        constructor(name: string, age: number, gender: number) {
            super(name, age, gender)
        }

        public showInfo() {
            console.log(`name is ${this.name}, gender is ${Gender[this.gender]}`)
        }
    }

    const c = new Child2('Mary', 19, Gender.female);
    console.log(c.name);
    // console.log(Gender[c.gender]) // 属性“gender”受保护，只能在类“Parent2”及其子类中访问。
    // console.log(c.age); // 属性“age”为私有属性，只能在类“Parent2”中访问。
    c.showInfo();

    // 设置constructor为protected 则只能创建子类实例，无法用该类创建实例

    /* readonly修饰符 */

    // tslint:disable-next-line:max-classes-per-file
    class UserInfo {
        public readonly name: string;
        constructor(name: string) {
            this.name = name;
        }
    }
    const user = new UserInfo('Che');
    console.log(user.name)
    // user.name = 'gayhub'; //法分配到 "name" ，因为它是只读属性。

    /* 参数属性 */

    // tslint:disable-next-line:max-classes-per-file
    class A {
        constructor(public name: string) {
            // Auto inject
        }
    }
    const a1 = new A('Che_Gayhub');
    console.log(a1);

    /* 静态属性 */

    // tslint:disable-next-line:max-classes-per-file
    class B {
        /* static part */
        public static age: number = 18;
        public static getInfo() {
            console.log(this.age)
        }
        /* static part end */
        constructor() {
            // Empty
        }
    }
    console.log(B.age);
    B.getInfo();

    /* 可选类属性 */

    // tslint:disable-next-line:max-classes-per-file
    class C {
        public name: string;
        public age?: number;
        constructor(name: string, age?: number, public gender?: Gender) {
            this.name = name;
            this.age = age;
        }
    }
    const c1 = new C('Che')
    const c2 = new C('Che', 18)
    const c3 = new C('Che', 18, Gender.male)
    console.log(c1, c2, c3)

    /* 存取器 */

    // tslint:disable-next-line:max-classes-per-file
    class D extends C{
        constructor(name: string, age?: number, public gender?: Gender) {
            super(name, age, gender)
        }

        get info(): {name: string, age?: number}{
            return {name: this.name, age: this.age}
        }

        set info(info: {name: string, age?: number}) {
            this.name = info.name;
            this.age = info.age;
        }
    }
    // get的返回值和对应的set的参数值类型必须一致
    // 若未手动设置，则会自动判断类型
    // set传参必须为一个值
    const d = new D('Che', 18, Gender.male);
    const dInfo = d.info;
    dInfo.age = 15;
    d.info = dInfo;
    console.log(d);

    /* 抽象类 */
    // tslint:disable-next-line:max-classes-per-file
    abstract class Person {
        protected abstract _age: number
        constructor(public name: string) {
            // Empty
        }
        abstract get age(): number
        abstract set age(age:number)
        public abstract printName(): void;
    }
    // tslint:disable-next-line:max-classes-per-file
    class Man extends Person {
        // 非抽象类“Man”不会实现继承自“Person”类的抽象成员“_age”。
        protected _age: number;
        constructor(name: string) {
            super(name);
        }
        // 非抽象类“Man”不会实现继承自“Person”类的抽象成员“printName”。
        public printName():void {
            console.log(this.name);
        }

        get age() {
            return this._age
        }
        set age(value: number) {
            this._age = value;
        }
    }
    // new Person('Che') // 无法创建抽象类的实例。
    const man1 = new Man('Che');
    man1.printName();
    man1.age = 18;
    console.log(man1, man1.age)

    /* 实例类型 */

    // 类 既是一个类 也是一个类型
    // tslint:disable-next-line:max-classes-per-file
    class Q {
        constructor(public name: string) {
            // Empty
        };
    }
    const q: Q = new Q('Che');
    // tslint:disable-next-line:max-classes-per-file
    class Animal {
        constructor(public name: string) {
            // Empty
        };
    }
    // 这里不会报错
    const cat: Q = new Animal('cat');
    // tslint:disable-next-line:max-classes-per-file
    class Qs extends Q {
        constructor(name: string, public age: number) {
            super(name);
        }
    }
    const qs: Q = new Qs('Che', 18);
    console.log(qs, qs.name)
    // console.log(qs.age) //类型“Q”上不存在属性“age”。
    console.log((qs as Qs).age);

    /* 补充知识 */
    /* 类与类型接口 */

    // 类可以“实现”一个接口
    interface FoodInterface{
        type: string, name: string
    }
    // tslint:disable-next-line:max-classes-per-file
    class FoodClass implements FoodInterface {
        type: string;
        name: string;
    }

    // 接口可以“继承”一个类
    // tslint:disable-next-line:max-classes-per-file
    class E {
        protected name: string;
    }
    // tslint:disable-next-line:no-unused-expression
    // tslint:disable-next-line:no-empty-interface
    interface F extends E{ }
    // tslint:disable-next-line:no-unused-expression
    // tslint:disable-next-line:max-classes-per-file
    class G extends E implements F {
        // Class 'G' incorrectly implements interface 'F'.
        // Property 'name' is protected but type 'G' is not a class derived from 'E'.
        public name: string;
    }
    const g = new G();
    g.name = 'Che';
    console.log(g)

    // 参数h是一个构造函数 T为构造函数的返回值类型或其父类
    const create = <T>(h: new () => T): T => {
        // 调用构造函数
        return new h()
    }

    // tslint:disable-next-line:max-classes-per-file
    class H {
        public age: number;
    }

    console.log(create<H>(H))
})()