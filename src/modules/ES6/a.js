// export const name = 'Gayhub';
// export const age = 18;
// export const address = 'Tianjin';
const name = 'Gayhub';
const age = 18;
const address = 'Tianjin';
export { name, age, address };

export function func() { }
export class A { }
function func1() { }
class B { }
const b = '';
export {
    func1 as Function1,
    B as ClassB,
    b as StirngB,
    b as Stringb
}
// 1. export 不可导出字面量
// 2. export 不可重复导出
// 3. export 的变量是动态绑定的
export let time = new Date();
setInterval(() => {
    // 导出的time会随时间流逝而变化
    time = new Date();
}, 1000)
// 4. export不可出现在块级作用域中(if 循环 function等)
export default 'string';