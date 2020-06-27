export function createElement(vElement) {
    const dom = document.createElement(vElement.type);
    if (vElement.props) {
        Object.keys(vElement.props).forEach(key => {
            const value = vElement.props[key];
            realDom.setAttribute(dom, key, value); // 设置属性
        });
    }
    vElement.children.forEach(child => render(child, dom)); // 递归渲染子节点
    return dom;

}

export function createTextElement(value) {
    const textNode = document.createTextNode(value);
    return textNode;
}

export function setAttribute(dom, name, value) {
    // 如果属性名是className，则改回class
    if (name === 'className') name = 'class';

    // 如果属性名是onXXX，则是一个事件监听方法
    if (/on\w+/.test(name)) {
        name = name.toLowerCase();
        dom[name] = value || '';
        // 如果属性名是style，则更新style对象
    } else if (name === 'style') {
        if (!value || typeof value === 'string') {
            dom.style.cssText = value || '';
        } else if (value && typeof value === 'object') {
            for (let name in value) {
                // 可以通过style={ width: 20 }这种形式来设置样式，可以省略掉单位px
                dom.style[name] = typeof value[name] === 'number' ? value[name] + 'px' : value[name];
            }
        }
        // 普通属性则直接更新属性
    } else {
        if (name in dom || name === 'key') {
            dom[name] = value || '';
        }
        if (value) {
            dom.setAttribute(name, value);
        } else {
            dom.removeAttribute(name);
        }
    }
}