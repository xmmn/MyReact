import isFunctionComponent from "./isFunctionComponent"
import mountNativeElement from "./mountNativeElement"
import bindFunctionalComponent from './bindFunctionalComponent'
import bindStatefulComponent from './bindStatefulComponent'

export default function mountComponent(virtualDom, container, oldDom) {
    let nextVirtualDom = null
    let component = null
    // 处理函数组件
    if (isFunctionComponent(virtualDom)) {
        nextVirtualDom = bindFunctionalComponent(virtualDom)
    } else {
        // 处理类组件
        nextVirtualDom = bindStatefulComponent(virtualDom)
        component = nextVirtualDom.component
    }

    // 调用函数，返回值可能是普通的虚拟Dom，也可能是另一个组件

    if (typeof nextVirtualDom.type === 'function') {
        // 继续调用自身
        mountComponent(nextVirtualDom, container, oldDom)
    } else {
        // 当作普通的虚拟Dom节点处理
        mountNativeElement(nextVirtualDom, container, oldDom)
    }

    if (component) {
        if (component.props && component.props.ref) {
            // 调用ref
            component.props.ref(component)
        }
    }
}