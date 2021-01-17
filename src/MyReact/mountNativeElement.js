import createDomElement from './createDomElement'

export default function mountNativeElement(virtualDom, container, oldDOM) {
    // 调用createDomElement 创建Dom
    const newElement = createDomElement(virtualDom)
    // 将转换之后的DOM对象放置在页面中
    if (oldDOM) {
        container.insertBefore(newElement, oldDOM)
    } else {
        container.appendChild(newElement)
    }
    // 获取类组件实例对象
    let component = virtualDom.component
    // 如果类组件实例对象存在
    if (component) {
        // 将DOM对象存储在类组件实例对象中
        component.setDom(newElement)
    }
}
