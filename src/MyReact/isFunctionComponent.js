export default function isFunctionComponent(virtualDOM) {
    const type = virtualDOM.type
    return (
        type && typeof virtualDOM.type === 'function' && !(type.prototype && type.prototype.render)
    )
}