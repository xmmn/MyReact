import mountNativeElement from './mountNativeElement'
import mountComponent from './mountComponent'

export default function mountElement(
    virtualDom,
    container,
    oldDom
) {
    if (typeof virtualDom.type === 'function') {
        mountComponent(virtualDom, container, oldDom)
    } else {
        // 调用mountNativeElement方法将虚拟Dom转换为真实Dom
        mountNativeElement(virtualDom, container, oldDom)
    }
}