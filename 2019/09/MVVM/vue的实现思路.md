**new一个vue实例**
```js
/* 定义一个类，用于创建vue实例 */
class Vue {
  constructor(options = {}) { // option参数默认值为对象，避免报错
    // 给vue实例增加属性
    this.$el = options.el
    this.$data = options.data
    this.$methods = options.methods

    // 监视data中的数据
    new Observer(this.$data)

    // 把data中的所有的属性代理到了vm上，简化this.$data.key为vm.key
    this.proxy(this.$data)
    // 把methods中所有的数据代理到了vm上，简化this.$methods.fnName 为 vm.methods.fnName
    this.proxy(this.$methods)

    // 如果制定了el参数，对el进行解析
    if (this.$el) {
      // compile负责解析模板的内容
      // 需要： 模板和数据
      let c = new Compile(this.$el, this)
    }
  }
  proxy(data) {
    // Object.keys(data)  将对象的key值提取为一个数组
    Object.keys(data).forEach(key => {
      // 属性代理到实例对象上
      /*
        Object.defineProperty(obj, prop, descriptor)
        这个方法会直接在一个对象上定义一个新属性，或修改一个对象的现有属性，并返回这个对象
        返回值： 被传递给函数的对象
        obj: 要在其上定义属性的对象
        prop: 要定义或修改的属性的名称
        descriptor: 将被定义或修改的属性描述符
      */
      Object.defineProperty(this, key, {
        configurable: true, // 表示该属性描述符是否可以被改变或删除
        enumerable: true, // 对象是否可以被枚举
        get() {
          // 当属性被访问时，该方法会被执行
          return data[key]
        },
        set(newValue) {
          // 当属性被设置时，该方法会被执行
          if(data[key] === newValue) {
            // 当设置的值和原有值相同时不做操作
            return
          }
          data[key] = newValue
        }
      })
    })
  }
}
```
- 实现一个Compiler模板解析器，能够对模板中的指令和插值表达式进行解析，并且赋予不同的操作
```js
/* 专门负责解析模板内容 */
new Class {
  constructor(el, vm) {
    // el: new vue 传递的选择器
    this.el = typeof el === 'string' ? document.querySelector(el) : el
    this.vm = vm

    if (this.el) {
      // 把el中的所有的子节点都放入到内存中， fragment
      let fragment = this.node2fragment(this.el)
      // 在内存中编译fragment
      this.compile()
    }
  }

  /* 核心方法 */
  node2fragment (node) {
    // 创建一个新的空白的文档片段（这个文档片段存在于内存中）
    let fragment = document.createDocumentFragment()
    // 把el中所有的子节点挨个添加到文档碎片中
    let childNodes = node.childNodes // 子节点为一个数组，包含文本节点及元素节点
    this.toArray(childNodes).forEach(node => {
      // 把所有的子节点添加到fragment中
      fragment.appendChild(childNodes)
    })
    return fragment
  }


  /*
    编译文档碎片
  */
  compile (fragment) {
    let childNodes = fragment.childNodes
    this.toArray(childNodes).forEach(node => {
      // 编译子节点
      if (this.isElementNode(node)) {
        // 如果是元素，需要解析指令
        this.compileElement(node)
      }
      if (this.isTextNode(node)) {
        // 如果是文本节点， 需要解析插值表达式
        this.compileText(node)
      }

      if (node.childNodes && node.childNodes.length > 0) { // 递归处理子节点的子节点
        this.compile(node)
      }
    })
  }

  compileElement (node) {
    // 1. 获取到当前节点下所有的属性
    let attributes = node.attributes
    this.toArray(attributes).forEach(attr => {
      // 2. 解析vue的指令（所有以v-开头的属性）

      let attrName = attr.name
      if (this.isDirective(attrName)) {
        let type = attrName.slice(2) // 截取v-指令后面的指令名称
        let expr = attr.value // 获取属性绑定的值

        if (this.isEventDirective(type)) { // 如果是事件 v-on指令
          CompileUtil["eventHandler"](node, this.vm, type, expr)
        } else {
          CompileUtil[type](node, this.vm, expr)
        }
      }
    })
  }

  compileText (node) {
    CompileUtil.mustache(node, this.vm)
  }


  // 工具方法
  toArray (likeArray) { // 转数组
    // call方法调用一个函数，其具有一个指定的this值和分别提供的参数（参数的列表），返回一个数组
    // slice.call 把调用方法的参数截取出来
    return [].slice.call(likeArray)
  }

  isElementNode (node) { // 是否是元素节点
    // nodeType: 节点的类型， 1：元素节点， 3：文本节点
    return node.nodeType === 1
  }
  isTextNode (node) { // 是否是文本节点
    return node.nodeType === 3
  }
  isDirective (attrName) { // 是否包含 v-
    return attrName.startsWith('v-')
  }
  isEventDirective (type) { // 是否是事件指令
    return type.split(":")[0] === 'on'
  }

}

// 工具方法对象，增加可复用性
let CompileUtil = {
  mustache(node, vm) {
    let txt = node.textContent
    let reg = /\{\{(.+)\}\+}/
    if(reg.text(txt)) {
      let expr = RegExp.$1 // 值得是与正则表达式第一个括号子串匹配 （以括号为标志），此例中为 (.+)
      node.textContent = txt.replace(reg, this.getVMValue(vm, expr))

      new Watcher(vm, expr, newValue => {
        node.textContent = txt.replace(reg, newValue)
      })
    }
  },
  text(node, vm, expr) {
    // 处理v-text指令
    node.textContent = this.getVMValue(vm, expr)

    new Watcher(vm, expr, (newValue, oldValue) => {
      node.textContent = newValue
    })
  },
  html(node, vm, expr) {
    // 处理v-html
    node.innerHTML = this.getVMValue(vm, expr)

    new Watcher(vm, expr, newValue => {
      node.innerHTML = newValue
    })
  },
  model(node, vm, expr) {
    // 处理v-model
    node.value = this.getVMValue(vm, expr)

    node.addEventListener('input', function(){
      // 这里的this指向事件对象
      self.setVMValue(vm, expr, this.value)
    })

    new Watcher(vm, expr, newValue => {
      node.value = newValue
    })
  }
  // 这个方法用户获取VM中的数据
  getVMValue (vm, expr) {
    // 获取到data中的数据
    let data = vm.$data
    expr.split('.').forEach(key => {
      data = data[key]
    })
    return data
  },
  setVMValue (vm, expr, value) {
    let data = vm.$data
    // 下面这种处理方式主要是为了兼容复杂类型数据处理
    let arr = expr.split('.')
    arr.forEach((key, index) => {
      if (index < arr.length-1) { // 如果不是最后一项
        data = data[key]
      } else {
        data[key] = value
      }
    })
  }
}
```
- 实现一个Observer数据监听器，能够对数据对象的所有属性进行监听
```js
/*
  observer 用于给data中所有的数据添加getter和setter
  方便我们在获取或者设置data中数据的时候，实现我们的逻辑
*/
class Observer {
  constructor(data) {
    this.data = data
    this.walk(data)
  }

  // 核心方法
  /*
    遍历data中所有的数据，都添加上getter和setter
  */
  walk (data) {
    // 如果data为空或不是复杂类型，则不做处理
    if(!data || typeof data != 'object') {
      return
    }

    Object.keys(data).forEach(key => {
      this.defineProperty(data, key, data[key])
      this.walk(data[key]) // 递归处理复杂类型参数
    })
  }

  // 定义响应式的数据（数据劫持）
  // data中的每一个数据都应该维护一个dep对象
  // dep 保存了所有的订阅了该数据的订阅者
  defineProperty (obj, key, value) {
    let that = this
    let dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get(){
        // 如果Dep.target中有watcher对象，存储到订阅者数组中
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set(newValue) {
        if (value === newValue) {
          return
        }
        value = newValue
        that.walk(newValue) // 如果newValue 是一个复杂类型数据，也应该对其进行劫持
      }
    })
  }
}
```
- 实现一个Watcher观察者，将Compile的解析结果，与Observer所观察的对象连接起来，建立关系，在Observer观察到对象数据变化时，接收通知，同时更新DOM
```js
/* watcher 负责把compile模块与observer模块关联起来*/
class Watcher {
  /*
    vm: 当前vue实例对象
    expr： data中数据名称
    callback: 数据发生改变之后要执行的回调方法
  */
  constructor (vm, expr, callback) {
    this.vm = vm
    this.expr = expr
    this.cb = callback

    // this表示的就是新创建的Watcher对象
    // 将创建的watcher对象挂在到Dep.target上
    Dep.target = this

    // 需要将expr的旧值存储起来，用于下一次比对
    this.oldValue = this.getVMValue(vm, expr)

    // 清空Dep.target, 便于下次创建实例使用
    Dep.target = null
  }
  // 用于获取vm中的数据
  getVMValue(vm, expr) {
    let data = vm.$data
    expr.split('.').forEach(key => {
      data = data[key]
    })
    return data
  }

  // 对外提供一个方法，这个方法用于更新页面
  update() {
    // 对比expr是否发生了改变，如果发生了改变，则调用回调
    let oldValue = this.oldValue
    let newValue = this.getVMValue(this.vm, this.expr)
    if (oldValue != newValue) {
      this.cb(newValue, oldValue)
    }
  }
}

/* dep对象用于管理所有的订阅者和通知这些订阅者 */
class Dep {
  constructor() {
    // 用于管理订阅者
    this.subs = []
  }

  // 添加订阅者
  addSub(watcher) {
    this.subs.push(watcher)
  }

  // 通知
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
```


- 创建一个公共的入口对象，接收初始化的配置并且协调上面三个模块
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <p v-text="msg"></p >
    <p>{{msg}}</p >
    <p>{{car.brand}}</p >
    <p v-html="msg"></p >
    <input type="text" v-model="msg">
    <button v-on:click="clickFn">按钮</button>
  </div>
  <script src="./src/watcher.js"></script>
  <script src="./src/observe.js"></script>
  <script src="./src/compile.js"></script>
  <script src="./src/vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        msg: 'hello vue111',
        car: {
          brand: '宝马'
        }
      },
      methods: {
        clickFn() {
          // 在vue的methods中this应该指向当前实例
          this.msg = '哈哈'
          this.car.brand = '奔驰'
        }
      }
    })
  </script>
</body>

</html>
```
