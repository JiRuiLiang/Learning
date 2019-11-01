<template lang="html">
  <div class="initial">
    <el-input v-model="end" placeholder="请输入截止时间 yy-MM-dd"></el-input>
    <el-button type="primary" @click="changeTime">确认</el-button>
    <div v-if="surplus">
      时间还剩：{{ time.dd }}天 {{ time.hh }}小时 {{ time.mm }}分钟 {{ time.ss }}秒
    </div>
    <div class="second" v-if="second">
      还剩：<em style="color:red;">{{second}}</em>秒
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      end: null,
      surplus: false, // 是否显示剩余时间
      time: {
        ss: null, // 秒
        mm: null, // 分
        hh: null, // 时
        dd: null // 天
      },
      timer: null,
      second: null
    }
  },
  methods: {
    changeTime () {
      if (!this.end) {
        alert('请选择截止时间')
      }
      var future = Date.parse(new Date(this.end)) // 设定时间
      if (isNaN(future)) {
        alert('格式错误')
        return false
      }
      clearInterval(this.timer)
      var nowTime = Date.parse(new Date()) // 当前时间
      this.second = (future - nowTime)/1000 // 时间余额
      this.secondTimer()
      let _this = this
      this.timer = setInterval(function () {
        _this.secondTimer()
      }, 1000)
    },
    secondTimer () {
      this.time.dd = Math.floor(this.second / (24 * 3600))
      let level1 = this.second % (24 * 3600)
      this.time.hh = Math.floor(level1 / 3600)
      let level2 = level1 % 3600
      this.time.mm = parseInt(level2 / 60)
      this.time.ss = level2 % 60
      if (this.time.ss >= 0) {
        this.time.hh.toString().length > 1 ? '' : this.time.hh = '0'+this.time.hh
        this.time.mm.toString().length > 1 ? '' : this.time.mm = '0'+this.time.mm
        this.time.ss.toString().length > 1 ? '' : this.time.ss = '0'+this.time.ss
        this.surplus = true
      }
      --this.second
    }
  }
}
</script>

<style lang="css">
  .el-input {
    width: 200px;
  }
</style>
