/**
 * exports[value] 可以导出指定属性的属性名
 * module.exports 可以导出一个对象或属性，会作为默认导出
 * module.exports 会覆盖 exports[value]导出的数据
 * @var {[type]}
 */
exports.name = 'Gayhub'
exports.age = 18

// module.exports = function () {
//     console.log('module.exports as defalut')
// }