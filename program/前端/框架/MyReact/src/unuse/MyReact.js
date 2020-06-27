/** @jsx DiyReact.createElement */

const DiyReact = MyReact();

const randomLikes = () => Math.ceil(Math.random() * 100);

const stories = [
  {name: "DiyReact介绍", url: "http://google.com", likes: randomLikes()},
  {name: "Rendering DOM elements ", url: "http://google.com", likes: randomLikes()},
  {name: "Element creation and JSX", url: "http://google.com", likes: randomLikes()},
  {name: "Instances and reconciliation", url: "http://google.com", likes: randomLikes()},
  {name: "Components and state", url: "http://google.com", likes: randomLikes()}
];

class App extends DiyReact.Component {
  render() {
    return (
      <div>
        <h1>DiyReact Stories</h1>
        <ul>
          {this.props.stories.map(story => {
            return <Story name={story.name} url={story.url} />;
          })}
        </ul>
      </div>
    );
  }
  
  componentWillMount() {
    console.log('execute componentWillMount');
  }
  
  componentDidMount() {
    console.log('execute componentDidMount');
  }
  
  componentWillUnmount() {
    console.log('execute componentWillUnmount');
  }
}

class Story extends DiyReact.Component {
  constructor(props) {
    super(props);
    this.state = { likes: Math.ceil(Math.random() * 100) };
  }
  like() {
    this.setState({
      likes: this.state.likes + 1
    });
  }
  render() {
    const { name, url } = this.props;
    const { likes } = this.state;
    const likesElement = <span />;
    return (
      <li>
        <button onClick={e => this.like()}>{likes}<b>❤️</b></button>
        <a href={url}>{name}</a>
      </li>
    );
  }
  
  shouldcomponentUpdate() {
    return true;
  }
  
  componentWillUpdate() {
    console.log('execute componentWillUpdate');
  }
  
  componentDidUpdate() {
    console.log('execute componentDidUpdate');
  }

}

DiyReact.render(<App stories={stories} />, document.getElementById("root"));
function MyReact() {
    let rootInstance = null;
    const TEXT_ELEMENT = 'TEXT_ELEMENT';
    let lifeCycle = {
        didMount: function (instance) {
            instance.componentInstance &&
                instance.componentInstance.componentDidMount &&
                instance.componentInstance.componentDidMount();
        },
        // 废弃
        willMount: function (instance) {
            instance.componentInstance.componentWillMount &&
                instance.componentInstance.componentWillMount &&
                instance.componentInstance.componentWillMount();
        },
        getDerivedStateFromProps: function (instance, nextProps, prevState) {
            if (instance.componentInstance.getDerivedStateFromProps &&
                instance.componentInstance.getDerivedStateFromProps) {
                return instance.componentInstance.getDerivedStateFromProps(nextProps, prevState);
            }
        },
        render: function (parentNode, instance, vElement) {
            if (instance.componentInstance && instance.componentInstance.render) {
                let newChildVElement = instance.componentInstance.render();
                instance.childInstance = createInstance(newChildVElement);
                let oldChildInstance = instance.childInstance;
                let newChildInstance = reconcile(parentNode, oldChildInstance, newChildVElement);
                instance.childInstance = newChildInstance;
                // 组件的dom是直接用的子dom
                instance.dom = newChildInstance.dom;
                instance.vElement = vElement;
            }
        },
        shouldUpdate: function (instance) {
            if (instance.componentInstance && instance.componentInstance.shouldcomponentUpdate) {
                return instance.componentInstance.shouldcomponentUpdate();
            }
        },
        didUpdate(instance) {
            instance.componentInstance &&
                instance.componentInstance.componentDidUpdate &&
                instance.componentInstance.componentDidUpdate();
        },
        willUnMount: function (instance) {
            instance.componentInstance.componentWillUnmount &&
                instance.componentInstance.componentWillUnmount &&
                instance.componentInstance.componentWillUnmount();
        }
    }

    function render(vElement, parentNode) {
        const prevInstance = rootInstance;

        // 比较vElement和前一帧
        const nextInstance = reconcile(parentNode, prevInstance, vElement);

        // 存储结果
        rootInstance = nextInstance;
    }

    function reconcile(parentNode, prevInstance, vElement) {
        let newInstance;
        // 如果前一帧不存在
        if (prevInstance === null) {
            // 直接创建
            newInstance = createInstance(vElement);
            newInstance.componentInstance.state = Object.assign({}, newInstance.componentInstance.state,
                lifeCycle.getDerivedStateFromProps(newInstance, vElement.props, null))
            // dom元素没有componentInstance
            lifeCycle.render(parentNode, newInstance, vElement);
            lifeCycle.didMount(newInstance);
            parentNode.appendChild(newInstance.dom);
        } else if (vElement === null) {
            // 新一帧没东西，直接清空
            lifeCycle.willUnMount(prevInstance);
            dom.removeChild(prevInstance.dom);
            newInstance = null;
        } else if (prevInstance.vElement.type !== vElement.type) {
            // 整个字节点产生了变化，直接替换
            newInstance = createInstance(vElement);
            // dom元素没有componentInstance
            if (newInstance.componentInstance) {
                newInstance.componentInstance.state = Object.assign({}, newInstance.componentInstance.state,
                    lifeCycle.getDerivedStateFromProps(newInstance, vElement.props, prevInstance.componentInstance.state))
                lifeCycle.render(parentNode, newInstance, vElement);
            }

            lifeCycle.didMount(newInstance);
            parentNode.replaceChild(newInstance.dom, prevInstance.dom);
        } else if (typeof (vElement.type) === 'string') {
            // 普通元素，更新属性
            updateDomProperties(prevInstance.dom, prevInstance.vElement.props, vElement.props);
            // 普通元素没有自己的生命周期所以需要额外进行
            prevInstance.childInstances = reconcileChildren(prevInstance, vElement);
            prevInstance.vElement = vElement;
            newInstance = prevInstance;
        } else {
            // 只更新属性
            prevInstance.componentInstance.state = Object.assign({}, prevInstance.componentInstance.state,
                lifeCycle.getDerivedStateFromProps(prevInstance, vElement.props, prevInstance.componentInstance.state))

            if (lifeCycle.shouldUpdate(prevInstance)) {
                lifeCycle.render(parentNode, prevInstance, vElement);
                lifeCycle.didUpdate(prevInstance);
            }
            newInstance = prevInstance;
        }
        return newInstance;
    }

    function reconcileChildren(instance, vElement) {
        const {
            dom,
            childInstances
        } = instance;
        const newChildElements = vElement.props.children || [];
        const count = Math.max(childInstances.length, newChildElements.length);
        const newChildInstances = [];
        for (let i = 0; i < count; i++) {
            newChildInstances[i] = reconcile(dom, childInstances[i], newChildElements[i]);
        }
        return newChildInstances.filter(instance => instance !== null);
    }

    function updateDomProperties(dom, prevProps, nextProps) {
        const isEvent = name => name.startsWith("on");
        const isAttribute = name => !isEvent(name) && name != "children";

        // Remove event listeners
        Object.keys(prevProps).filter(isEvent).forEach(name => {
            const eventType = name.toLowerCase().substring(2);
            dom.removeEventListener(eventType, prevProps[name]);
        });

        // Remove attributes
        Object.keys(prevProps).filter(isAttribute).forEach(name => {
            dom[name] = null;
        });

        // Set attributes
        Object.keys(nextProps).filter(isAttribute).forEach(name => {
            dom[name] = nextProps[name];
        });

        // Add event listeners
        Object.keys(nextProps).filter(isEvent).forEach(name => {
            const eventType = name.toLowerCase().substring(2);
            dom.addEventListener(eventType, nextProps[name]);
        });
    }

    function createInstance(vElement) {
        const {
            type,
            props = {}
        } = vElement;

        const isDomElement = typeof type === 'string';

        if (isDomElement) {
            // 创建dom
            const isTextElement = type === TEXT_ELEMENT;
            const dom = isTextElement ? document.createTextNode('') : document.createElement(type);

            // 设置dom的事件、数据属性
            updateDomProperties(dom, [], vElement.props);
            const children = props.children || [];
            const childInstances = children.map(createInstance);
            const childDoms = childInstances.map(childInstance => childInstance.dom);
            childDoms.forEach(childDom =>  childDom ?  dom.appendChild(childDom) : undefined);
            const instance = {
                vElement,
                dom,
                childInstances
            };
            return instance;
        } else {
            const instance = {};
            const componentInstance = createComponentInstance(vElement, instance);
            const childElement = componentInstance.render();
            const childInstance = createInstance(childElement);
            Object.assign(instance, {
                dom: childInstance.dom,
                vElement,
                childInstance,
                componentInstance
            });
            return instance;
        }
    }

    function createComponentInstance(vElement, instance) {
        const {
            type,
            props
        } = vElement;
        const componentInstance = new type(props);
        componentInstance.__internalInstance = instance;
        return componentInstance;
    }

    /**
     * 文字也是element
     * @param {*} element 
     */
    function createTextElement(value) {
        return createElement(TEXT_ELEMENT, {nodeValue: value});
    }

    /**
     * 将这个节点下的节点全部形成vElement
     * @param {*} type 
     * @param {*} props 
     * @param  {...any} children 
     */
    function createElement(type, props, ...children) {
        props = Object.assign({}, props);
        props.children = [].concat(...children)
            .filter(child => child != null && child !== false)
            .map(child => child instanceof Object ? child : createTextElement(child));

        return {
            type: type,
            props: props,
        }
    }

    class Component {
        constructor(props) {
            this.props = props;
            this.state = this.state || {};
        }

        setState(newState) {
            this.state = Object.assign({}, this.state, newState);
            // 进行声明周期
            const parentDom = this.__internalInstance.dom.parentNode;
            const vElement = this.__internalInstance.vElement;
            reconcile(parentDom, this.__internalInstance, vElement);
        }
    }

    return {
        render: render,
        createElement: createElement,
        Component: Component
    }

}

/**MyReact
 
instance {
    dom,
    componentInstance,
    vElement,
    childVElement,
    childInstance: {
        dom,
        componentInstance,
        vElement,
        childVElement,
        childInstance: {

        }
    },
}
 */

