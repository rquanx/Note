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

