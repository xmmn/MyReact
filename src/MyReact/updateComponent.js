import diff from "./diff"

export default function updateComponent(
    virtualDOM,
    oldComponent,
    oldDOM,
    container
) {
    // 组件更新
    oldComponent.updateProps(virtualDOM.props)
    // 获取组件返回的最新的 virtualDOM
    let nextVirtualDOM = oldComponent.render()
    // 更新 component 组件实例对象
    nextVirtualDOM.component = oldComponent
    // 比对
    diff(nextVirtualDOM, container, oldDOM)
}