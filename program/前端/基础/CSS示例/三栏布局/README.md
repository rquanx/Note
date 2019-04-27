#### 三栏布局

##### Flex布局



##### 定位实现

- 左右两列绝对定位并且固定宽度；
- 中间元素自适应，且左右margin设置为左右元素的宽度；
- 定位的缺点：当出现滚动条时，中间内容区在滚动条后边显示，而且内容区仍旧被压缩(不推荐使用)



##### 浮动实现

- 因为浮动脱离了文档流，所以middle一定要放在三列元素的最后面；
- 缺点：如果在布局外添加的有文字，则会出现问题：
  - 1、middle未浮动，left和right浮动；
  - 2、浮动的本质是解决文字环绕图片，所以添加的这个文字应该环绕着最近的那个浮动的元素围绕在周围排列；
  - 3、将未浮动的middle挤了下去。



##### 圣杯布局

- 圣杯布局的要求：随着页面宽度的变化，三栏布局中的中间盒子优先自适应渲染，两边盒子宽度固定不变；
- 需求：
  - 1.两边固定，中间自适应；
  - 2.先加载middle内容；
  - 3.三列等高布局；

- 步骤： 
  - 布局：有头，有尾，有内容，middle部分要放在content的最前部分，然后是left，reight；
  - 浮动让三者在一行，出现高度塌陷，content清浮动；
  - middle宽度设为100%，占满；
  - left上去，拉到最左边：margin-left: -100%; right同理：margin-left:-200px;
  - middle内容被left、right覆盖未显示，所以把middle内容拉回来，content:{padding: 0 200px};
  - 此时lefe和right都跟着被拉回来了，左右空出了200px。所以用相对定位把left,right拉回来；

- 问题
  - 如果某一列内容过多，文字会溢出。解决方法：等高布局；
  - 最小宽度问题：min-width:600px



##### 双飞翼布局

- 思路是：middle是鸟的身体，left和right是鸟的翅膀，先把主要的东西middle放好，再将翅膀移到合适的位置；

- 步骤 
  - middle部分要放在content的最前部分，然后是left，reight；
  - 浮动让三者在一行，出现高度塌陷，content清浮动；
  - middle宽度设为100%，占满；
  - left上去，拉到最左边：margin-left: -100%; right同理：margin-left:-200px;
  - 以上，都和圣杯布局一样；
  - 因为现在middle的内容被left和right覆盖了，我们除了考虑设置外围content的padding之外，还可以考虑用margin把middle拉过来；
  - 在middle中加一个内部元素middle-inner，设置其margin:0 200px;

