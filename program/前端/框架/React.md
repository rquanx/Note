##### 属性

对组件的配置项,通信，数据

##### 状态

the state is meant to hold variables that relate to the current state of the UI

保存跟ui相关的数据

[thinking-in-react](<https://reactjs.org/docs/thinking-in-react.html>)

不要在 state 中添加 render() 方法中不需要的数据，会影响渲染性能！
可以将组件内部使用但是不渲染在视图中的内容，直接添加给 this

###### SetState

一般会是异步进行

class组件会批量更新

setState时必定render，然后根据新的结果更新页面

> setState后会按照所有数据最新的值进行显示，即使是内部对象数据，只要变化了在render时就会按新的值呈现
>
> render时，会重新render所有子组件，父组件不会render




##### 使用

使用polyfill
1、页面全局引用
2、react内引入，在最顶部引入，或在webpack中设置打包



使用react，两个js库
1、单独出来，全局引用,如果要配合polyfill则polyfill也只能全局引用
2、打包进verdon中，需要有一个入口js import两个库然后调用render，进行组件挂载
[wepack + react](https://www.cnblogs.com/mianbaodaxia/p/6170726.html)

不要使用renderXXX,要使用函数式组件









##### 组件分类

样式型组件 

> 内部已经规定好生成的结构和样式，只传入指定的内容属性即可     
>
> 如：title="123"                             



结构型组件 

> 内部规定好大致的结构，具体显示内容如何显示通过属性指定       
>
> 如：title={<span   className="">123</span>} 



组合型组件 

> 父组件作为容器，具体显示的内容通过jsx写到children中，基础组件可以考虑使用组合型  
>
> 如： ant design                             



配置型组件  

> 内部已经规定好根据指定的数据结构生成，复杂交互类可用，进行业务封装等 
>
> 如：fabric的dropDown等                      



##### 函数组件

```react
let S = (props) => (<h1>{props.data}</h1>);
<S data={"123"}> </S>

```

##### 事件机制

合成事件
	1、屏蔽浏览器差异（兼容性），简化事件处理和回收，效率提高
	2、所有事件绑定到最外层
	3、通过一个统一的事件监听器进行处理
	4、只实现了DOM3的的事件接口
	5、有些事件没有实现（resize）
	6、由于事件捕获的兼容性问题，且实际用处不大，React只实现事件冒泡
	7、不只是注册了一个onchange事件，还注册了很多其他事件。而这个时候我们向文本框输入内容的时候，是可以实时的得到内容的。然而原生只注册一个onchange的话，需要在失去焦点的时候才能触发这个事件。所以这个原生事件的缺陷react也帮我们弥补了
	
	
	

使用原生DOM进行事件绑定时，卸载需要手动卸载，否则可能会产生内存泄漏


##### 生命周期

###### 是否要根据props设定state
将属性值转化为state，建议只用来作初始化

在componentDidUpdate中判断新属性和旧属性，然后进行更新

新的方法试用useMemo可以实现依赖于某个属性更新时重新计算

###### willmount

  在render前,被后续版本会被取消

###### didmount 

 在render后,建议用于异步的数据加载

```react
componentDidMount = async () => {
	Console.log(this.state.a) // 0
	await This.setstate({ a: 1});
	Console.log(this.state.a) // 1
	await This.setstate({ a: 2});
	Console.log(this.state.a) // 2
}
// 设置成asyn/await
```





###### shouldComponentUpdate

最好只用于性能优化  

###### willreceive

对于willreceive尽量不要无条件的更新状态，即做些判断？
​	判断
​	脱离willreceive的控制
​	当多个复用的时候，通过key重新创建组件，如果元素简单可能会有略微的性能差异，但是复杂的时候直接创建新的可以避免差异对比，可能会更快

控制好willreceive更新的状态，如一个输入框，如果在willreceive里有更新的话，这样本来应该受手动输入影响的就会多了父组件的render影响

###### getDerivedStateFromProps

返回状态对象来更新，不更新返回null =>  替代willreceive?

[react 16后生命周期](https://blog.hhking.cn/2018/09/18/react-lifecycle-change/?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)



componentDidCatch



##### Context

组件间隔层传递数据，全局，但是需要通过provider和consumer来使用
​	例如将某个组件的状态属性和状态更新函数传递给某个子组件

```javascript
// provide  
var value = {  data: "a" , changeData: () => { xxx } }
// consumer  
this.context.changeData();
```

[context](https://www.cnblogs.com/mengff/p/9511419.html)



##### Protal

将组件render到悬浮最顶层，常用为dialog

*Portal* 提供了一种很好的将子节点渲染到父组件以外的 DOM 节点的方式。

```
ReactDOM.createPortal(child, container)
```

第一个参数是任何可渲染的 React 子节点，例如元素，字符串或片段。第二个参数是 DOM 元素。



##### Fragments

它是 React 中的常见模式，用于组件返回多个元素。*Fragments* 可以让你聚合一个子元素列表，而无需向 DOM 添加额外节点。

```
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  )
}
```





##### Hook

```typescript
const App: React.FC<{ title: string }> = ({ title }) => {
  return React.useMemo(() => <div>{title}</div>, [title]);
};

App.defaultProps = {
  title: 'Function Component'
}
```

useState

> 普通状态或set



useEffect

> 替代didupdate,
>
> ​	返回值：一个函数，函数会用于willunmount
>
> ​	第二个参数：在useEffect里setState会触发再次执行，第二个参数传入依赖值，只有依赖变了才会再触发useEffect，空数组则只会执行一次
>
> 每次变化都能监控到，如果用didupdate是批量更新只获取到最新的



useRef

> 用来存储数据
>
> 创建一个一直存在的可变对象，修改值不会影响render



useCallback

> 成一个不随着组件更新而再次创建的 callback
>
> 
>
> 缓存函数  用来建立常量，不随render重建,依赖项变化才重建   == useMemo
>
> 函数要么放外面声明，要么用usecallback，提高性能



useMemo

> 缓存变量 ，当返回函数时===  useCallback  当依赖的状态发生改变时，才会触发计算函数的执行



##### 高阶组件

###### 概念

接受一个或多个组件作为参数并且返回一个组件就可称之为 高阶组件



###### 分类

- 无状态
- 有状态



属性代理

- 操作 `props`
  - 在render中给组件增加属性
- 抽离 `state`
  - 增加state处理,redux
- 通过 `ref` 访问到组件实例
- 用其他元素包裹传入的组件 `WrappedComponent`



反向继承

**一个函数接受一个 WrappedComponent 组件作为参数传入，并返回一个继承了该传入 WrappedComponent 组件的类，且在该类的 render() 方法中返回 super.render() 方法**

- 操作 `state`
- 渲染劫持（Render Highjacking）
  - 有条件地展示元素树（`element tree`）
  - 操作由 `render()` 输出的 React 元素树
  - 在任何由 `render()` 输出的 React 元素中操作 `props`
  - 用其他元素包裹传入的组件 `WrappedComponent` （同 **属性代理**）



###### 高阶组件问题

- 静态方法丢失
- `refs` 属性不能透传
- 反向继承不能保证完整的子组件树被解析



高阶组件带给我们极大方便的同时，我们也要遵循一些 **约定**：

- `props` 保持一致
- 你不能在函数式（无状态）组件上使用 `ref` 属性，因为它没有实例
- 不要以任何方式改变原始组件 `WrappedComponent`
- 透传不相关 `props` 属性给被包裹的组件 `WrappedComponent`
- 不要再 `render()` 方法中使用高阶组件
  - // 每次 render 的时候，都会使子对象树完全被卸载和重新
    // 重新加载一个组件会引起原有组件的状态和它的所有子组件丢失
- 使用 `compose` 组合高阶组件
- 包装显示名字以便于调试



###### 应用场景

- 权限判断



##### Render Props

通过children函数

像 **控制反转（IoC）**




##### 编码技巧 

###### 条件渲染
isTrue ? <p>True!</p> : null ;  ==>  isTrue && <p>True!</p>

jsx表达式可以写iife来嵌入函数进行条件渲染


##### 知识点



##### static defaultProps

###### refs

隐含的对象，  ref=x    this.refs.x   可以拿到元素

ref 中使用回调函数
​	ref={(ref) => { this.myRef = ref; }}
​	有缺点，每次都是重新绑定

###### key

key值并不是需要全局唯一，而只需要在相邻的兄弟元素中唯一就好,用于渲染

###### this 

如果不绑定this.handleClick方法，那么在事件发生并且精确调用这个方法时，方法内部的this会丢失指向。
这不是React的原因，这是JavaScript中本来就有的。如果你传递一个函数名给一个变量，然后通过在变量后加括号()来调用这个方法，
　此时方法内部的this的指向就会丢失

###### childrenthis

this.props.children属性。它表示组件的所有子节点



###### 兼容性

[浏览器兼容](https://reactjs.org/docs/react-dom.html#browser-support)

###### pureComponent和component
pureComponent
> 更新前会进行浅比较,变化后才会render

component
> setState,不管是否变化，必定会render

1. Component存在的问题?
1). 父组件重新render(), 当前组件也会重新执行render(), 即使没有任何变化
2). 当前组件setState(), 重新执行render(), 即使state没有任何变化

2. 解决Component存在的问题
1). 原因: 组件的componentShouldUpdate()默认返回true, 即使数据没有变化render()都会重新执行
2). 办法1: 重写shouldComponentUpdate(), 判断如果数据有变化返回true, 否则返回false
3). 办法2: 使用PureComponent代替Component
4). 说明: 一般都使用PureComponent来优化组件性能

3. PureComponent的基本原理
1). 重写实现shouldComponentUpdate()
2). 对组件的新/旧state和props中的数据进行浅比较, 如果都没有变化, 返回false, 否则返回true
3). 一旦componentShouldUpdate()返回false不再执行用于更新的render()



###### 强制刷新

​	component.forceUpdate(callback)



##### 国际化

 [react-intl](https://segmentfault.com/a/1190000005824920#articleHeader8)



##### 文章



[官方文档博客](https://reactjs.org/docs/implementation-notes.html)

[React-Css模块化](https://github.com/gajus/react-css-modules)

[React实践细节](https://juejin.im/entry/5a614d226fb9a01cac183cc9)

[React Conf 2018](https://juejin.im/post/5bfcbc83e51d450fb3263a35)

[渲染](https://www.jianshu.com/p/100a55978253)

[通讯](https://yq.aliyun.com/articles/66083)

[react组件资料](https://www.jianshu.com/p/788a82dac136  )

[React Router	](https://www.jianshu.com/p/e3adc9b5f75c)NavLink比link多了激活样式

[Airbnb React/JSX 代码规范](https://github.com/BingKui/javascript-zh/tree/master/react)

[smart-and-dumb-components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)


##### https://overreacted.io/writing-resilient-components/

React-hook配合lint
1.a common mistake when learning React is to copy props into state
	make sure to call that prop initialxxx or defaultxxx
	少数情况下可以故意这样处理
一种情况是利用props进行计算然后赋值给state，
	一、move the state calculation into the render method
	二、不想每次render都计算，仍然放到state但是在didupdate中进行判断和重新计算
	三、useMemo hook，加上依赖项
	
2、依赖于特定的属性和状态去请求数据
	一、didupdate中对比然后请求
	二、useefftect 加上依赖
	
组件不应该因为它或其父组件频繁地重渲染而坏掉
	使用一个不受控的组件，加上 key 来重置它
	
不阻断数据流 	props 和 state 可能会更新，组件应该处理好这些更新，不论什么时候。
时刻准备渲染	 一个组件不应该被或多或少的渲染而损坏。
没有单例组件 	即使组件只渲染一次，但通过设计让它渲染两次也不会被破坏，是更好了。
隔离本地状态 	想想哪个状态是特定 UI 展示下的本地状态——并且除非必要，不要将该状态提升到更高的地方


##### Redux

###### 文章

[redux Blob](https://github.com/lulujianglab/blog/issues/34)

[redux](https://segmentfault.com/a/1190000012976767)
[redux](https://segmentfault.com/a/1190000011474522)

##### Route

React-Route

path="/" === 所有页面都匹配上，所以要加exact来强匹配

<Route> 匹配就渲染，<Switch>只渲染第一个匹配的？

 

[Loadable Components按需加载](<https://reactjs.org/docs/code-splitting.html>)

[官方按需加载](<https://www.smooth-code.com/open-source/loadable-components/docs/support/>)



##### Fabric react

TextField 的type会影响显示,number 、string

defaultValue={this._editDate.item["Remark"]} onChanged={this._getRemark}
设置默认值和读取新值

##### 错误处理

[Objects are not valid as a React child 错误处理	可能把对象给了元素](https://blog.csdn.net/isaisai/article/details/78083677)

##### JSX

###### 编译

```html
<!--如果不提前对js代码进行编译，进行jsx解析-->
<script src="JSXTransformer.js"></script>
<!--对应js加上type="text/jsx"-->
```



##### 应用

###### 拖拽上传

```react
render()	{
    var fileElements = "";
    (<div className="upload-form" id="dragDiv" 
         onDrop={(e) => this._getFile(e)} 
         onDragEnter={(e) => this._handleDragHover(e)} 
         onDragOver={(e) => this._handleDragHover(e)} 
         onDragLeave={(e) => this._handleDragHover(e)}>
              {fileElements}
     </div>
    )
}


 @autobind
  private _getFile(e) {
    var self = this;
    e.preventDefault(); //取消默认浏览器拖拽效果
    var fileList = e.dataTransfer.files; //获取文件对象
    if (fileList.length == 0) { return false; }
    self.setState({
      files: fileList
    })
  }

  @autobind
  private _handleDragHover(e) {
    e.stopPropagation()
    e.preventDefault()
  }
```

###### PDF预览

react-pdf
canvas渲染
​	chrome
​		部分文件很快（1~2s），部分文件慢(10s左右)
​	ie11   
​		部分文件较快（8~10s），部分文件慢(1m),浏览器会无响应
svg
​	chrome
​		小文件很快，大文件略慢，样式会乱（下方按钮）
​	ie11
​		小文件很快，大文件略慢，样式会乱（下方按钮、组件高度样式有bug），而且显示速度略慢，页面内容显示的顺序错乱，观感不好
​			新版本的组件会修复组件样式问题但是目前新版本还没正式发布	

​	api	onrenderSuccess

[React实现全局组件：Toast轻提示](https://segmentfault.com/a/1190000016473517)

###### 路由
this.props.history.push可以适用于hash route
hash路由依赖于window.location.href

搜索window.location.href源码可以在源头改造路由？




