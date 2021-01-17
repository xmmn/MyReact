export default function updateTextNode(virtualDOM, oldVirtualDOM, oldDOM) {
    if (virtualDOM.props.textContent !== oldVirtualDOM.props.textContent) {
        // 修改旧的文本节点文本内容
        oldDOM.textContent = virtualDOM.props.textContent
    }
    // 将新的虚拟节点添加到dom节点的_virtualDom属性中
    oldDOM._virtualDom = virtualDOM
}