/* ES6模块 */

/* export */

// export 变量
// export {变量1, 变量2, 变量3, ...}

/* import */

// import { name, age, address } from './b';
// console.log(name, age, address)

/* export default */
// export default 变量名
// export default 表达式
// export default 字面量

// 1. 可以使用as 别名，会覆盖原名
// 2. import的内容是只读的不可重新赋值 类似const
// 3. from 的文件后缀可省略（由webpack配置的resolve.extensions控制）
// 4. 可以直接import文件会将全文件引入，而不是其中的部分变量。
// 5. import 会自动提升至文件顶部（类似function）
// 6. import 是静态编译的，不能动态引入
// 7. import 不能写在块级作用域中
// 8. import 相同文件多次导入会合并成一个，只会执行一次
// 9. import * as 别名 from
// 10. import 引入 export default 时注意以下几点
// 10.0 base: import value from
// 10.1 别名语法 import {default as 别名} from
// 10.2 import 合并引入 default和其他变量 import some {...other} from file
import * as info from './b'
// import str , * as aInfo from './a'
import str, { name, age, address } from './a'
// import func from './c'
// import func from './c'
// import otherName from './c'
// import {default as someName} from './c'
// otherName()
// func()
// someName()

/*  import export 复合写法 */

// export + import defalut 复合写法 作为普通变量导出
// export { default as funcName } from './c'
// export + import 复合写法 作为普通变量导出
// export { ClassB, StringB } from './a'
// 此文件中无法使用 复合写法 引入的变量
// 复合写法可以使用别名与通配整体导出
// export * from './a'
// export { ClassB as classB, StringB as stringB } from './a'

/* 动态加载模块 */
const statu = 1;
if (statu) {
    import('./a')
} else {
    import('./b')
}