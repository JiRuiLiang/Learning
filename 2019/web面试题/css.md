1. 与角度相关的单位有哪些？
  - deg

2. 一个元素设置了`z-index`属性，为什么不生效
  - 未设置定位属性

3. 如何用CSS让文本强制换行？
  - word-wrap: break-word;
  - word-break: break-all;

4. vertical-align属性的默认值是什么关键字？
  - baseline (baseline是小写字母x下面的一条线)

5. CSS的哪个属性能够缩放背景图像？
  - backgroun-size

6. CSS的哪个属性能够使背景模糊显示？
  - filter

7. 把CSS3新增的background-size属性设为哪一个值，能在保持原图像的宽高比的前提下，缩放到能放进背景区的尺寸。
  - contain

8. 把CSS属性background-attachment设为哪一个值，能把背景图像附着到内容上，使得图像会随着内容一起滚动。
  - scroll

9. 如何让CSS3动画实现无数次循环？
  - animation: 动画名称 3s infinite;

10. transform属性包含哪些变形函数？
  - rotate(): 单位deg 角度单位，旋转
  - skew(): 倾斜
  - scale(): 缩放，正负值
  - translate(): 位移 x,y双参数

11. css属性兼容浏览器前缀
  - -ms IE
  - -moz 火狐
  - -webkit chrome/safari
  - -o 欧朋(opera)

12. 在多列布局中，使用哪个属性可让元素跨列？
  - columns  多列布局
  - column-width 定义每列列宽
  - column-count 定义分列列数
  - column-gap 定义列间距
  - column-rule 定义每列中间的分割线
  - column-span 定义多列布局中子元素跨列效果，Firefox不支持,只有 Chrome 和 Opera 支持 column-span 属性。此功能类似于表格元素<table>中列元素<td>的colspan属性，你可以用来设置文章标题（横跨所有列）

13. 哪个属性能让伸缩容器中的子元素主轴对齐？
  - justify-content

14. CSS3中全新的特性有哪些？
  - 选择器
  - RGBA 和 透明度
  - 多栏布局
  - 多背景图
  - Word Wrap
  - 文字阴影
  - @font-face 属性
  - 圆角(边框半径)
  - 边框图片
  - 盒阴影
  - 盒子大小
  - 媒体查询
  - 语音

15. CSS3新增的属性有哪些？
  + 边框
    - border-radius 创建圆角 border：2px solid;
    - box-shadow 边框阴影 box-shadow:10px 10px 5px \#888888;
    - border-image border-image：url(border.png) 30 30 round;
  + 背景
    - background-size 属性规定背景图片的尺寸
    - background-origin 属性规定背景图片的定位区域。背景图片可以放置于 content-box、padding-box 或 border-box 区域。
  + 文字效果
    - text-shadow 文本应用阴影 text-shadow:5px 5px 5px \#FFFFFF;
    - word-wrap 换行 word-wrap:break-word;
  + 2D转换
    + transform: 通过 CSS3 转换，我们能够对元素进行移动、缩放、转动、拉长或拉伸。
      - translate() 元素从其当前位置移动 transform：translate（50px,100px）
      - rotate() 元素顺时针旋转给定的角度。允许负值，元素将逆时针旋转。transform:rotate(30deg);
      - scale() 元素缩放。transform:scale(2,4);值 scale(2,4) 把宽度转换为原始尺寸的 2 倍，把高度转换为原始高度的 4 倍。
      - skew() 元素转动给定的角度，根据给定的水平线（X 轴）和垂直线（Y 轴）参数：transform:skew(30deg,20deg);值 skew(30deg,20deg) 围绕 X 轴把元素转动 30 度，围绕 Y 轴转动 20 度。
      - matrix() 方法把所有 2D 转换方法组合在一起。需要六个参数，包含数学函数，允许您：旋转、缩放、移动以及倾斜元素。
  + 3D转换
    - rotateX() 元素围绕其 X 轴以给定的度数进行旋转。transform：rotateX(120deg);
    - rotateY() 元素围绕其 Y 轴以给定的度数进行旋转。transform：rotateY(120deg);
    - rotate()
  + 多列布局
    - column-count 属性规定元素应该被分隔的列数。
    - column-gap 属性规定列之间的间隔。
    - column-rule 属性设置列之间的宽度、样式和颜色规则。
  + 用户界面
    - resize 属性规定是否可由用户调整元素尺寸。
    - box-sizing 属性允许您以确切的方式定义适应某个区域的具体内容。
    - outline-offset 属性对轮廓进行偏移，并在超出边框边缘的位置绘制轮廓。

16. 元素浮动的缺陷有哪些？
  - 导致父元素高度塌陷，影响与父元素同级的元素
  - 与浮动元素统计的非浮动元素（内联元素）会跟随其后
  - 若非第一个元素浮动，则该元素之前的元素也需要浮动，否则会影响页面显示的解构

17. 什么叫渐进增强？和优雅降级有哪些区别？
  + 渐进增强：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。
  + 优雅降级：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。　
  + 区别
    - 优雅降级是从复杂的现状开始，并试图减少用户体验的供给，
    - 而渐进增强则是从一个非常基础的，能够起作用的版本开始，并不断扩充，以适应未来环境的需要。
    - 降级（功能衰减）意味着往回看；而渐进增强则意味着朝前看，同时保证其根基处于安全地带。

18. 什么是css预处理器？
  - 一种新的语言，基本思想，用一种专门的编程语言为css增加了一些编程的特性，将css作为目标生成文件，然后开发者就只要使用这种语言进行编码工作。
  - css预处理器为css增加一些编程例如你可以在 CSS 中使用变量、简单的逻辑程序、函数（如右侧代码编辑器中就使用了变量$color）等等在编程语言中的一些基本特性，可以让你的 CSS 更加简洁、适应性更强、可读性更佳，更易于代码的维护等诸多好处。

19. css预处理器的优缺点？
  + 优点
    - 开发速度提升；
    - 代码优化效率提高（对开发者而言）；
    - 代码更通俗易懂（对开发者而言）；
    - 维护简单便捷；
    - 代码更干净，优美；
  + 缺点
    - 需要多一个编译器来重新编译一次CSS代码

20. 什么是盒模型？
  - 元素的内容（content），元素的内边距（padding），元素的边框（border），元素的外边距（margin）四个部分一起构成了盒模型

21. 什么是外边距塌陷？
  - 外边距塌陷也称为外边距合并，是指两个在正常流中相邻（兄弟或父子关系）的块级元素的外边距，组合在一起变成单个外边距，不过只有上下外边距才会有塌陷，左右外边距不会出现这种问题。

22. 将元素的display属性设为inline-block后，能把多个元素排列在一行中，但元素之间会间隙，如何才能去除间隙？
  - 为父元素设置font-size: 0;
  - 为 inline-block 元素添加浮动
  - 设置父元素 display: table; 和 word-spacing: -1em;

23. display:none与visibility:hidden都可隐藏元素，有何区别？
  - display:none; 元素不显示，不占位置
  - visibility: hidden; 元素不显示，占有位置

24. 请谈谈你对BFC的理解？
  + 块级格式化上下文，它是指一个独立的块级渲染区域，只有Block-level BOX参与，该区域拥有一套渲染规则来约束块级盒子的布局，且与区域外部无关。
  + BFC的生成条件
    - float值不为none
    - overflow的值不为visible
    - display的值为inline-block/table-cell/table-caption/table
    - position的值为absolute/fixed
  + BFC 在布局中的应用
    - 防止margin重叠
    - 清除浮动

25. 是否了解过`hasLayout`属性？形容一下。

26. 伪元素::before和:before有什么区别？
  - 伪元素：为DOM树没有定义的虚拟元素。不同于其他选择器，它不以元素为最小选择单元，它选择的是元素指定内容。比如::before表示选择元素内容的之前内容
  - 伪类：用于选择DOM树之外的信息，或是不能用简单选择器进行表示的信息。

27. css3中`calc()`函数是什么，有什么作用？
  - calc()函数就是一个计算函数
  - 可以用来指定元素的长度，动态计算长度值。

28. 什么叫Web安全色？
  - 就是为了兼容各大浏览器而出的一个16进制颜色标准

29. 在CSS中使用background:transparent与opacity:0有什么区别？
  - background: transparent; 可以显示元素的内容
  - opacity: 0; 整个元素隐藏，不显示任何内容

30. 字体风格（font-style）有两个关键字，分别是italic和oblique，它们有什么区别？
  - italic和oblique都是向右倾斜的文字, 但区别在于Italic是指斜体字，而Oblique是倾斜的文字，对于没有斜体的字体应该使用Oblique属性值来实现倾斜的文字效果.
