1. let和const两个关键字与var之间有哪些不同？
  - var 没有块级作用域，只有函数作用域和全局作用域
  - let 和 const 可以用于声明变量，能够将变量绑定到当前所处的任意作用域中
  - let与const 对比 var： 1. 不允许声明提升 2.不允许重复声明 3.不覆盖全局变量
  - let 是变量，不允许重复声明
  - const 是常量，并且必须在声明时赋值，对象形式可以更换内部的值

2. 执行下面的代码，在控制台输出的x为`0`，y为`1`。
  ```js
    var x = 0, y = 0;
    x
    ++
    y
    console.log(x, y);
  ```

3. 调用下面代码中的函数，最终返回的结果为 `undefined`。
  ```js
    function isArray() {
      return
      true;
    }
    isArray();
  ```

4. 执行下面的代码后，在控制台输出的y为 `3`。
  ```js
    var y,
        x = 1;
    y = x+++x;
  ```

5. 2+true等于`3`，'6'+9等于`69`。

6. 4+3+2+"1"等于`91`，"1"+2+4等于`124`。

7. (1, 5 - 1) * 2 等于`8`。

8. 请说明JavaScript中的原生对象（native objects）和宿主对象（host objects）。
  - 内置（Build-in）对象： 总是在引擎初始化阶段就被创建好的对象，是原生对象的一个子集（由 ECMAScript 实现提供的、独立于宿主环境的所有对象，在 ECMAScript 程序开始执行时出现）
  - 原生（Naitve）对象：除了内置对象，还包括了一些在运行过程中动态创建的对象。（Object、Function、Array、String、Boolean、Number、Date、RegExp、Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError、ActiveXObject(服务器方面)、Enumerator(集合遍历类)、RegExp（正则表达式））
  - 宿主对象：宿主对象不是引擎的原生对象，而是由宿主框架通过某种机制注册到JavaScript引擎中的对象。所有的 BOM 和 DOM 对象都是宿主对象。所有非原生对象都是宿主对象（host object）。

9. undefined和null的有哪些异同？
  - 含义不同
    + undefined：表示使用var声明变量但未对其加以初始化时，这个变量的值就是undefined
    + null：是一个空对象指针，表示准备用来保存对象，还没有真正保存对象的值，如果定义的变量准备在将来用于保存对象，应该将该变量初始化为null。
  - 类型不同
    + 未初始化定义的值用typeof检测出来是"undefined"(字符串)，而null值用typeof检测出来是"object"（字符串）
  - 转化为值时不同
    + undefined 字符串："undefined", 数字：NaN, 布尔值：false, 对象：throws TypeError
    + null 字符串："null的返回值是"null", 数字：0, 布尔值：false, 对象：throws TypeError

10. 执行下面的代码后，在控制台输出的y为 `0`
  ```js
    var x = "1", y;
    switch (x) {
      case 1:
        y = 1;
        break;
      case 2:
        y = 2;
        break;
      default:
        y = 0;
    }
    console.log(y);
  ```

11. !function(){}的返回值是`false`。

12. 7 - "a"等于`NaN`，7 / 0等于`Infinity`。

13. 3..toFixed(2)得到的结果为`3.00`。

14. parseFloat('12.3.4')返回的结果为`12.3`。

15. Number(012)返回的结果为`10`，Number("0xA")返回的结果为`10`。

16. 在下面的代码中，Number()函数的参数是一个对象，最终的结果为`10`。
  ```js
    var numberObj = {
      valueOf: function() {
        return {};
      },
      toString: function() {
        return "10";
      }
    };
    Number(numberObj);
  ```

17. ~{}等于`-1`，~1.25等于`-2`。

18. 以下代码最终在控制台输出的结果为`20`。
  ```js
    var a = {},
      b = { name: "ping" },
      c = { name: "wen" };
    a[b] = 10;
    a[c] = 20;
    console.log(a[b]);
  ```

19. [] == ![]得到的结果为`true`。

20. [] + {}得到的结果为`[object Object]`，{} + []得到的结果为`0`。

21. 相等（==）和全等（===）运算符有哪些区别？

22. 下面代码最终的打印结果是`["strick"]`。
  ```js
    var obj1 = {
      names: []
    };
    var obj2 = obj1.names;
    obj2.push("strick");
    console.log(obj1.names);
  ```

23. 在下面的代码中，调用了三次test()方法，得到的结果分别是`true`、`true` 和`false`。
  ```js
    var str = "pw1",
      pattern1 = /\d/,
      pattern2 = /\d/g;
    pattern1.test(str);
    pattern2.test(str);
    pattern2.test(str);
  ```

24. 执行下面的代码后，arr1.length为`5`。
  ```js
    var arr1 = "ping".split(""),
      arr2 = arr1.reverse(),
      arr3 = "pw".split("");
    arr2.push(arr3);
  ```

25. 执行下面的代码后，arr数组的值为`[4, 1, 5, 2, 3]`。
  ```js
    var arr = [4, 1, 5, 2, 3];
    arr.sort(function(a, b) {
      return a > b;
    });
  ```

26. [1, 2, 3, 4, 5].splice(-2)的值为`[4, 5]`

27. [1, 2, 3, 4, 5].slice(NaN, 1)的值为`1`。

28. 下面代码执行后，在控制台会输出b变量，得到的结果是`5`。
  ```js
    (function() {
      var a = b = 5;
    })();
    console.log(b);
  ```

29. 1 instanceof Number的返回值是`false`，2 in [1,2]的返回值是`false`。

30. typeof undefined的返回值是`undefined`，typeof null的返回值是`object`。

31. 将Object的toString()方法分别应用于null和undefined（如下所示），得到的结果为`[object Null]`和`[object Undefined]`。

32. 执行下面的代码，结果的输出顺序是`1`、`3`、 `2`。
  ```js
    console.log(1);
    setTimeout(function() {
      console.log(2);
    }, 0);
    console.log(3);
  ```
