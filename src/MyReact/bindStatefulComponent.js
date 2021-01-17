export default function bindStatefulComponent(virtualDom) {
    // 创建实例
    const component = new virtualDom.type(virtualDom.props || {})
    // 调用render方法
    const nextVirtualDom = component.render()

    // 将实例添加到虚拟Dom对象中
    nextVirtualDom.component = component
    return nextVirtualDom
}