export default function updateElementNode(
    // 真实的Dom元素节点
    element,
    // 虚拟Dom对象，包含所有属性信息
    virtualDOM,
    oldVirtualDOM = {}
) {
    // 获取节点对应的属性对象
    const newProps = virtualDOM.props || {}
    const oldProps = oldVirtualDOM.props || {}
    Object.keys(newProps).forEach(propName => {
        const newPropsValue = newProps[propName]
        const oldPropsValue = oldProps[propName]
        if (newPropsValue !== oldPropsValue) {
            // 考虑属性名称是否以 on 开头 如果是就表示是个事件属性 onClick -> click
            if (propName.slice(0, 2) === "on") {
                const eventName = propName.toLowerCase().slice(2)
                element.addEventListener(eventName, newPropsValue)
                // 如果属性名称是 value 或者 checked 需要通过 [] 的形式添加
            } else if (propName === "value" || propName === "checked") {
                element[propName] = newPropsValue
                // 刨除 children 因为它是子元素 不是属性
            } else if (propName !== "children") {
                // className 属性单独处理 不直接在元素上添加 class 属性是因为 class 是 JavaScript 中的关键字
                if (propName === "className") {
                    element.setAttribute("class", newPropsValue)
                } else {
                    // 普通属性
                    element.setAttribute(propName, newPropsValue)
                }
            }
        }
    })

    // 判断属性被删除的情况
    Object.keys(oldProps).forEach(propName => {
        const newPropsValue = newProps[propName]
        const oldPropsValue = oldProps[propName]
        if (!newPropsValue) {
            // 属性被删除了
            if (propName.slice(0, 2) === "on") {
                const eventName = propName.toLowerCase().slice(2)
                newElement.removeEventListener(eventName, oldPropsValue)
            } else if (propName !== "children") {
                newElement.removeAttribute(propName)
            }
        }
    })
}