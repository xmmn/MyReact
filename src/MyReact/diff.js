import mountElement from './mountElement'
import createDomElement from './createDomElement'
import updateTextNode from './updateTextNode'
import updateElementNode from './updateElementNode'
import diffComponent from './diffComponent'

export default function diff(
    // 虚拟dom
    virtualDom,
    // 容器
    container,
    // 旧节点
    oldDom = container.firstChild
) {
    // 获取旧的虚拟节点
    const oldVirtualDom = oldDom && oldDom._virtualDom
    // 获取旧的实例
    const oldComponent = oldVirtualDom && oldVirtualDom.component
    // 如果旧的节点不存在，不需要对比，直接渲染并挂载到容器下
    if (!oldDom) {
        mountElement(virtualDom, container, oldDom)
    }
    // 执行对比更新
    else if (
        virtualDom.type !== oldVirtualDom.type &&
        typeof virtualDom.type !== 'function'
    ) {
        // 如果新旧虚拟Dom节点的类型不同，并且新的虚拟Dom不是组件
        const newDomElement = createDomElement(virtualDom)
        oldDom.parentNode.replaceChild(newDomElement, oldDom)
    } else if (typeof virtualDom.type === 'function') {
        // 处理组件更新
        diffComponent(virtualDom, oldComponent, oldDom, container)
    } else if (oldVirtualDom && virtualDom.type === oldVirtualDom.type) {
        // 节点类型相同
        if (virtualDom.type === 'text') {
            // 文本节点
            updateTextNode(virtualDom, oldVirtualDom, oldDom)
        } else {
            //元素节点
            updateElementNode(oldDom, virtualDom, oldVirtualDom)
        }

        let keyedElements = {}
        for (let i = 0, len = oldDom.childNodes.length; i < len; i++) {
            let domElement = oldDom.childNodes[i]
            if (domElement.nodeType === 1) {
                let key = domElement.getAttribute("key")
                if (key) {
                    keyedElements[key] = domElement
                }
            }
        }

        let hasNoKey = Object.keys(keyedElements).length === 0

        if (hasNoKey) {
            // 对比子节点
            virtualDom.children.forEach((child, i) => {
                diff(child, oldDom, oldDom.childNodes[i])
            })
        } else {
            // 2. 循环 virtualDom 的子元素 获取子元素的 key 属性
            virtualDom.children.forEach((child, i) => {
                let key = child.props.key
                if (key) {
                    let domElement = keyedElements[key]
                    if (domElement) {
                        // 3. 看看当前位置的元素是不是我们期望的元素
                        if (oldDom.childNodes[i] && oldDom.childNodes[i] !== domElement) {
                            oldDom.insertBefore(domElement, oldDom.childNodes[i])
                        }
                    } else {
                        // 新增元素
                        mountElement(child, oldDom, oldDom.childNodes[i])
                    }
                }
            })
        }

        let oldChildNodes = oldDom.childNodes
        // 如果有节点被删除，遍历删除
        if (oldChildNodes.length > virtualDom.children.length) {
            for (let i = oldChildNodes.length - 1; i > virtualDom.children.length - 1; i--) {
                oldDom.removeChild(oldChildNodes[i])
            }
        }
    }

}