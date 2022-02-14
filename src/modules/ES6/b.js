const name = 'Gayhub';
const age = 18;
const address = 'Tianjin';
export { name, age, address };
// export + import defalut 复合写法 作为普通变量导出
export { default as funcName } from './c'
// export + import 复合写法 作为普通变量导出
export { ClassB, StringB } from './a'
// 此文件中无法使用 复合写法 引入的变量
// funcName()
// new ClassB()
// console.log(StringB)
