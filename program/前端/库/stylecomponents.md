##### 使用


styled-componented包裹要放到组件外，否则每次render均会产生新组件，会导致子元素被卸载
> react 源码updateElement中会判定`current.elementType === element.type`,对于styled-components产生的type每次都是一个新的对象，对比不通过，根据diff算法，会直接将子节点卸载




##### 问题

**safari查看样式**

safari会看不到styled的注入，由于是使用了cssom操作