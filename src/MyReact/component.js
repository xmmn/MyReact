import diff from "./diff"
// 类组件父类
export default class Component {
    constructor(props) {
        this.props = props
    }

    setState(state) {
        // 合并state对象
        this.state = Object.assign({}, this.state, state)

        // 获取最新的虚拟Dom
        let virtualDom = this.render()
        // 获取旧的 virtualDom 对象 进行比对
        let oldDom = this.getDom()
        // 获取容器
        let container = oldDom.parentNode
        // 实现对象
        diff(virtualDom, container, oldDom)
    }

    setDom(dom) {
        this._dom = dom
    }

    getDom() {
        return this._dom
    }

    updateProps(props) {
        this.props = props
    }
}