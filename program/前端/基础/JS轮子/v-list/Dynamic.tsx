import React, { useRef, useState } from "react";
import styled from "styled-components";

/**
一般碰到不定高列表元素时有三种虚拟列表实现方式：
1、对输入数据进行更改，传入每一个元素对应的高度 dynamicHeight[i] = x x 为元素i 的行高

需要实现知道每一个元素的高度（不切实际）

2、将当前元素先在屏外进行绘制并对齐高度进行测量后再将其渲染到用户可视区域内

这种方法相当于双倍渲染消耗（不切实际）

3、传入一个estimateHeight 属性先对行高进行估计并渲染，然后渲染完成后获得真实行高并进行更新和缓存

会引入多余的transform（可以接受），会在后边讲为什么需要多余的transform...

 */

/**
 * 要点
 * 1、固定高度的可视窗口元素（提供隐藏超长子元素支持）
 * 2、无限或超出可视窗口高度的容器元素（提供滚动支持）
 * 3、内部项通过绝对定位控制顶部高度实现滚动位置累积
 * 
 * 优化
 * 1、滚动连续，永远渲染多几个元素
 * 2、快速滚动优化，顶部、底部增加缓存元素
 */

interface Prop {
  height: number;
}

/**
 * 最外层div，固定可视窗口高度，并且对于超长的子元素允许滚动
 */
const VListContainer = styled.div<Prop>`
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #e8e8e8;
  height: ${(props) => props.height + "px"};
`;

interface PProp extends Prop {}

/**
 * 内层子元素，高度强行铺满，即可滚动
 */
const PhantomContent = styled.div<PProp>`
  position: relative;
  height: ${(props) => props.height + "px"};
`;

/**
 * top绝对定位设定距离父元素高度，强行顶高，从而保持scroll height
 */
const Row = ({ index, rowHeight }) => {
  const item = index;
  return (
    <li
      key={item}
      style={{
        width: "100%",
        height: rowHeight + "px",
        position: "absolute",
        left: 0,
        right: 0,
        top: index * rowHeight,
        borderBottom: "1px solid #000",
      }}
      onClick={() => {
        console.log("item-", index);
      }}
    >
      item-{item}
    </li>
  );
};

const VList = () => {
  const ref = useRef({
    startIndex: 0,
    bufferStartIndex: 0, // 渲染时从bufferStartIndex开始渲染
    bufferSize: 5, // 顶部、底部增加缓冲，防止滚动过快导致界面来不及渲染，从而闪烁
    total: 10000,
    rowHeight: 80,
    height: 600, // 可视窗口高度
    limit: Math.ceil(600 / 80), // 在结合rowHeight和可视窗口，计算渲染数量
    endIndex: Math.min(0 + Math.ceil(600 / 80), 10000 - 1), // 最大数量不超过total - 1
  });

  /**
   * dom刷新
   */
  const [scrollTop, setScrollTop] = useState(0);

  const scrollingContainer = useRef();

  const onScroll = (evt: any) => {
    // 判断是否是我们需要响应的滚动事件，可省
    if (evt.target === scrollingContainer.current) {
      const { scrollTop } = evt.target;
      const { startIndex, total, rowHeight, limit, bufferSize } = ref.current;

      // 计算当前startIndex
      const currentStartIndex = Math.floor(scrollTop / rowHeight);

      // 如果currentStartIndex 和 startIndex 不同（我们需要更新数据了）
      if (currentStartIndex !== startIndex) {
        ref.current.startIndex = currentStartIndex;
        ref.current.bufferStartIndex = currentStartIndex - bufferSize;
        ref.current.endIndex = Math.min(
          currentStartIndex + limit + bufferSize,
          total - 1
        );
        setScrollTop(scrollTop);
      }
    }
  };

  const renderDisplayContent = () => {
    const { rowHeight, bufferStartIndex, endIndex } = ref.current;
    const content = [];
    // 注意这块我们用了 <= 是为了渲染x+1个元素用来在让滚动变得连续（永远渲染在判断&渲染x+2）
    for (let i = bufferStartIndex; i <= endIndex; ++i) {
      content.push(<Row index={i} rowHeight={rowHeight} />);
    }
    return content;
  };

  return (
    <VListContainer
      height={ref.current.height}
      ref={scrollingContainer}
      onScroll={onScroll}
    >
      <PhantomContent height={ref.current.total * ref.current.rowHeight}>
        {renderDisplayContent()}
      </PhantomContent>
    </VListContainer>
  );
};

export default VList;
