import mountElement from './mountElement'
import updateElementNode from './updateElementNode'

// 真正执行Dom渲染工作，包含文本节点和元素节点的渲染
export default function createDomElement(virtualDom) {
    let newElement = null
    if (virtualDom.type === 'text') {
        // 创建文本节点
        newElement = document.createTextNode(virtualDom.props.textContent)
    } else {
        // 创建元素节点
        newElement = document.createElement(virtualDom.type)
        // 元素节点创建完成后，需要处理元素属性
        updateElementNode(newElement, virtualDom)
    }

    // 保存旧的虚拟Dom
    newElement._virtualDom = virtualDom

    // 递归处理子节点
    virtualDom.children.forEach(child => {
        // 再次调用mountElement方法，将child作为虚拟Dom节点，newElement作为容器
        mountElement(child, newElement)
    })

    // 处理ref
    if (virtualDom.props && virtualDom.props.ref) {
        virtualDom.props.ref(newElement)
    }

    return newElement
}