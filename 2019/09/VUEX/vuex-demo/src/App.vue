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
    ]),
    ...mapMutations([
      'valueChange'
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
      // this.valueChange 此种方法调用不能传参
      this.length = this.getLength()
    }
  }

}
</script>
