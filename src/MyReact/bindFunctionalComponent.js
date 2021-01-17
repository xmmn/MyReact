export default function bindFunctionalComponent(virtualDom) {
    // type指向的就是函数组件声明时的函数
    // 调用函数并将props作为参数传递进去
    return virtualDom && virtualDom.type(virtualDom.props || {})
}