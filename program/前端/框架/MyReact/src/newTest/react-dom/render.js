import {
    diff
} from './diff'

function _render(vElement, container) {

    if (vElement === undefined) return;

    if (vElement.isReactComponent) {
        const component = vElement;

        if (component._container) {
            if (component.componentWillUpdate) {
                component.componentWillUpdate();
            }
        } else if (component.componentWillMount) {
            component.componentWillMount();
        }

        component._container = container; // 保存父容器信息，用于更新

        vElement = component.render();
    }

    if (typeof vElement === 'string' || typeof vElement === 'number') {
        let textNode = document.createTextNode(vElement);
        return container.appendChild(textNode);
    }

    const dom = document.createElement(vElement.type);

    if (vElement.attrs) {
        Object.keys(vElement.attrs).forEach(key => {

            const value = vElement.attrs[key];

            if (key === 'className') key = 'class';

            // 如果是事件监听函数，则直接附加到dom上
            if (typeof value === 'function') {
                dom[key.toLowerCase()] = value;
            } else {
                dom.setAttribute(key, vElement.attrs[key]);
            }

        });
    }

    if (vElement.children) {
        vElement.children.forEach(child => _render(child, dom));
    }

    return container.appendChild(dom);
}

function render(vElement, container, dom) {
    return diff(dom, vElement, container);
}

export default render;