[vue绑定简析](https://blog.csdn.net/u011277123/article/details/58597638)  [更多例子](https://www.cnblogs.com/weiqu/p/5860945.html)

##### 启动

```javascript
new Vue({
    el: "#app"   // 挂载的目标元素,
    // el: document.getElementById("app")
    template: `<div>{{text}}</div>`, 
    // 一个根节点,{{嵌入表达式}}
    data: function() {
    	return {
        	text: "hhh" 	
    	}
	}
})
```



##### 指令

v-xxx



v-text  === innerText

> ```javascript
> new Vue({
>  el: "#app"  
>  template: `<div v-text="text"></div>`, 
>  // 一个根节点,{{嵌入表达式}}
>  data: function() {
>  	return {
>      	text: "hhh" 	
>  	}
> 	}
> })
> ```

v-html === innerHTML

> ```javascript
> new Vue({
>  el: "#app"  
>  template: `<div v-html="text"></div>`, 
>  // 一个根节点,{{嵌入表达式}}
>  data: function() {
>  	return {
>      	text: "<div>hhh</div>" 	
>  	}
> 	}
> })
> ```
>
> 

v-if   v-else  v-else-if   要一起用则需要相邻
v-show
v-bind

> 单向绑定?
>
> ```javascript
> new Vue({
>  el: "#app"  
>  template: `<div v-bind:class="text"></div>`, 
>  
>  // template: `<div :class="text"></div>`, //简写
>  // 一个根节点,{{嵌入表达式}}
>  data: function() {
>  	return {
>      	text: "text" 	
>  	}
> 	}
> })
> ```
>
> 

v-on

> ```javascript
> template: `<div v-on:click="表达式/函数"></div>`
> template: `<div @click="表达式/函数"></div>`
> ```

v-modal

> ```javascript
> template: `<div v-modal="表达式/函数"></div>`
> ```
>
> 和bind一样，但是是双向绑定，只能绑定有value属性的元素
>
> 
>
> 本质
>
> \- v-bind绑定一个value值
>
> \- v-on指令给当前元素绑定input事件

v-for

> ```javascript
> template: `
> 	<div v-for="i in item"  :class="i.className">		{{i.name}}
> 	</div>`;
> // 数组
> template: `
> 	<div v-for="(i,index) in item":class="i.class">		{{i.name}}{{index}}
> 	</div>`;
> // 对象
> template: `
> 	<div v-for="(i,key,index) in item" >		
> 		{{i.name}}
> 	</div>`;
> ```



方法绑定

```javascript
new Vue({
    el: "#app"  
    template: `<button @:click="change"></button>`, 
    data: function() {
    	return {
        	text: "text" 	
    	}
	},
        methods: {
            change() {
                this.text = "xxx"; 
                // this自动绑定到data的对象
                console.log("click");
            }
        }
})
```



#### 虚拟DOM

Vue的实现是在每个节点编译，引用数据时都为其生成一个Watcher，显而易见，为每一个引用数据的节点都要生成一个Watcher，是有比较大的内存压力，如何解决，很简单，将粒度提升到组件级别，将低粒度的diff交给Virtual DOM

> 虚拟DOM进行底层的Diff
>
> 高层依赖于响应式Watcher来监控



#### QNA

##### 时间切片

Vue3本来也实现了时间分片，考虑到收益不大，又移除了，这应该是本身Vue的数据驱动方案的优势造成时间分片的收益较低