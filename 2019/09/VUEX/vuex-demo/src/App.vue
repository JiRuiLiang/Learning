<template>
    <section class="maxHeight">
      <p>{{name}}</p>
      <p>{{length}}</p>
      <button type="button" name="button" @click="changeName">改变name值</button>
    </section>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      length: 0
    }
  },
  computed: {
    ...mapState([
      'name'
    ]),
    ...mapGetters([
      'getLength'
    ]),
    ...mapActions([
      'getChangeValue'
    ])
  },
  mounted() {
    this.length = this.getLength()
    // this.$store.dispatch('getChangeValue')
    this.getChangeValue // 此种方法调用不能传参
  },
  methods: {
    changeName() {
      this.$store.commit('valueChange', '0111')
      // this.changeValue('对象引入')
      this.valueChange('数组引入')
      this.length = this.getLength()
    },
    // ...mapMutations({ // 通过数组方式引入无法传参，对象形式可以
    //   'changeValue': 'valueChange'
    // })
    ...mapMutations([ // 在计算属性引入无法传参，在methods内可以
      'valueChange'
    ])
  }

}
</script>
