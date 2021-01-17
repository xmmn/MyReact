import diff from './diff'

export default function render(
    // 虚拟dom
    virtualDom,
    // 容器
    container,
    // 旧节点
    oldDom = container.firstChild) {
    // 在diff方法内部判断是否需要对比更新
    diff(virtualDom, container, oldDom)
}