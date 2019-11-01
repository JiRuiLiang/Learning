## 总结

- 当具备以下两个特点时，使用Vuex
  + 多个视图依赖于同一状态
  + 来自不同视图的行为需要变更同一状态
- 在Actions内进行异步操作，而不要在Mutations内进行

- 首先在声明Vue实例之前，Vue.use(Vuex)
main.js
```js
import store from './store/index'
...

new Vue({
  el: '#app',
  store,
  ...
})
```
index.js
```js
const store = new Vuex.Store({ // 唯一数据源对象
  state: { // state 声明
    count: 0 // 这里声明的state的内容可以通过store.state.count 调用
  },
  mutations: { // mutations 变化
    increment (state) { // 通过 store.commit('increment')调用
      state.count++
    }
  }
})

```
