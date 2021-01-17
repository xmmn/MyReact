export default function createElement(type, props, ...children) {
    const childrenElements = [].concat(...children).reduce((result, child) => {
        if (child !== false && child !== true && child !== null) {
            // 如果child是对象，说明是元素节点
            if (child instanceof Object) {
                result.push(child)
            } else {
                // 否则是文本节点，需要用createElement创建文本节点对象
                result.push(createElement('text', { textContent: child }))
            }
        }

        return result
    }, [])
    return {
        type,
        // 支持通过children属性获取子元素
        props: Object.assign({ children: childrenElements }, props),
        children: childrenElements
    }
}