<template>
  <section class="maxHeight">
    <!-- title start -->
    <router-view></router-view>
    <!-- loading end -->
  </section>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {}
  },
  components: {
    Loading
  },
  computed: {
  },
  methods: {
  },
  mounted () {
  },
  created () {
  }
}
</script>
<style lang="scss">
</style>
