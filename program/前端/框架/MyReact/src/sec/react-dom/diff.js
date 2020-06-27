import {
    setAttribute
} from './dom'
import {
    Component
} from '../react'

export function diff(dom, vElement, container) {
    const ret = diffNode(dom, vElement);
    if (container && ret.parentNode !== container) {
        container.appendChild(ret);
    }
    return ret;
}

/**
 * @param {HTMLElement} dom 真实DOM
 * @param {vElement} vElement 虚拟DOM
 * @returns {HTMLElement} 更新后的DOM
 */
function diffNode(dom, vElement) {
    let out;
    if (!vElement) {
        vElement = "";
    }
    switch (typeof vElement) {
        case "boolean":
            {
                vElement = "";
            }
        case "number":
            {
                vElement = vElement.toString();
            }
        case "string":
            {
                out = diffTextElement(dom, vElement);
                break;
            }
        default:
            {
                if (typeof vElement.type === 'function') {
                    out = diffComponent(dom, vElement);
                } else {
                    out = diffDomElement(dom, vElement);
                }
                break;
            }
    }
    return out;
}

/**
 * 节点属性更新
 * @param {*} dom 
 * @param {*} vElement 
 */
function diffAttributes(dom, vElement) {

    const old = {}; // 当前DOM的属性
    const props = vElement.props; // 虚拟DOM的属性

    for (let i = 0; i < dom.attributes.length; i++) {
        const attr = dom.attributes[i];
        old[attr.name] = attr.value;
    }

    // 如果原来的属性不在新的属性当中，则将其移除掉（属性值设为undefined）
    for (let name in old) {
        if (!(name in props)) {
            setAttribute(dom, name, undefined);
        }

    }

    // 更新新的属性值
    for (let name in props) {
        if (old[name] !== props[name]) {
            setAttribute(dom, name, props[name]);
        }
    }

}

function diffTextElement(dom, vElement) {
    let out = dom;
    // 如果当前的DOM就是文本节点，则直接更新内容
    if (dom && dom.nodeType === 3) { // nodeType: https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
        if (dom.textContent !== vElement) {
            dom.textContent = vElement;
        }
        // 如果DOM不是文本节点，则新建一个文本节点DOM，并移除掉原来的
    } else {
        out = document.createTextNode(vElement);
        if (dom && dom.parentNode) {
            dom.parentNode.replaceChild(out, dom);
        }
    }
    return out;
}

function diffDomElement(dom, vElement) {
    let out = dom;
    if (!dom || !isSameNodeType(dom, vElement)) {
        out = document.createElement(vElement.type);
        if (dom) {
            [...dom.childNodes].map(out.appendChild); // 将原来的子节点移到新节点下
            if (dom.parentNode) {
                dom.parentNode.replaceChild(out, dom); // 移除掉原来的DOM对象
            }
        }
    }

    if (vElement.children && vElement.children.length > 0 || (out.childNodes && out.childNodes.length > 0)) {
        diffChildren(out, vElement.children);
    }
    diffAttributes(out, vElement);
    return out;
}

function diffComponent(dom, vElement) {

    let c = dom && dom._component;
    let oldDom = dom;

    // 如果组件类型没有变化，则重新set props
    if (c && c.constructor === vElement.type) {
        setComponentProps(c, vElement.props);
        dom = c.base;
        // 如果组件类型变化，则移除掉原来组件，并渲染新的组件
    } else {

        if (c) {
            unmountComponent(c);
            oldDom = null;
        }

        c = createComponent(vElement.type, vElement.props);

        setComponentProps(c, vElement.props);
        dom = c.base;

        if (oldDom && dom !== oldDom) {
            oldDom._component = null;
            removeNode(oldDom);
        }
    }

    return dom;

}

function diffChildren(dom, vchildren) {

    const domChildren = dom.childNodes;
    const children = [];
    const keyed = {};

    // 将有key的节点和没有key的节点分开
    if (domChildren.length > 0) {
        for (let i = 0; i < domChildren.length; i++) {
            const child = domChildren[i];
            const key = child.key;
            if (key) {
                keyed[key] = child;
            } else {
                children.push(child);
            }
        }
    }

    if (vchildren && vchildren.length > 0) {
        let min = 0;
        let childrenLen = children.length;
        let len = childrenLen;
        for (let i = 0; i < vchildren.length; i++) {
            const vchild = vchildren[i];
            const key = vchild.key;
            let child;
            // 如果有key，找到对应key值的节点从有key的元素组中寻找对应的
            if (key) {
                if (keyed[key]) {
                    child = keyed[key];
                    keyed[key] = undefined;
                }
            } else if (min < childrenLen) {
                // 如果没有key，从没有key的元素组中查找，且优先查找相同类型的
                for (let j = min; j < childrenLen; j++) {
                    let c = children[j];
                    if (c && isSameNodeType(c, vchild)) {
                        child = c;
                        children[j] = undefined;

                        // 减少遍历的数据量？
                        if (j === childrenLen - 1) childrenLen--;
                        if (j === min) min++;
                        break;
                    }
                }
            }

            // 对比
            child = diff(child, vchild);

            // 更新DOM
            const f = domChildren[i];
            if (child && child !== dom && child !== f) {
                // 如果更新前的对应位置为空，说明此节点是新增的
                if (!f) {
                    dom.appendChild(child);
                    // 如果更新后的节点和更新前对应位置的下一个节点一样，说明当前位置的节点被移除了
                } else if (child === f.nextSibling) {
                    removeNode(f);
                    // 将更新后的节点移动到正确的位置
                } else {
                    // 注意insertBefore的用法，第一个参数是要插入的节点，第二个参数是已存在的节点
                    dom.insertBefore(child, f);
                }
            }
        }
        // 去除多余的节点
        if (len > vchildren.length) {
            for (let i = vchildren.length; i < len; i++) {
                dom.removeChild(dom.childNodes[i])
            }
        }
    }
}



function removeNode(dom) {
    if (dom && dom.parentNode) {
        dom.parentNode.removeChild(dom);
    }
}

function isSameNodeType(dom, vElement) {
    if (typeof vElement === 'string' || typeof vElement === 'number') {
        return dom.nodeType === 3;
    }

    if (typeof vElement.type === 'string') {
        return dom.nodeName.toLowerCase() === vElement.type.toLowerCase();
    }

    return dom && dom._component && dom._component.constructor === vElement.type;
}



export function renderComponent(component) {

    let base;

    const renderer = component.render();

    if (component.base && component.componentWillUpdate) {
        component.componentWillUpdate();
    }

    base = diffNode(component.base, renderer);

    if (component.base) {
        if (component.componentDidUpdate) component.componentDidUpdate();
    } else if (component.componentDidMount) {
        component.base = base;
        component.componentDidMount();
    }

    component.base = base;
    base._component = component;

}

function setComponentProps(component, props) {
    if (!component.base) {
        if (component.componentWillMount) {
            component.componentWillMount();
        }
    } else if (component.componentWillReceiveProps) {
        component.componentWillReceiveProps(props);
    }

    component.props = props;

    renderComponent(component);

}

function createComponent(component, props) {

    let inst;

    if (component.prototype && component.prototype.render) {
        inst = new component(props);
    } else {
        inst = new Component(props);
        inst.constructor = component;
        inst.render = function () {
            return this.constructor(props);
        }
    }

    return inst;

}

function unmountComponent(component) {
    if (component.componentWillUnmount) component.componentWillUnmount();
    removeNode(component.base);
}