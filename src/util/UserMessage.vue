<template>
  <el-dropdown class="msg_drop" @command="msgHandleCommand">
    <span style="font-size: 15px" class="el-dropdown-link">消息</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="a">信息</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>export default {
  name: 'UserMessage',
  methods: {
    msgHandleCommand (command) {
      if (command === 'e') {
        this.$cookies.delete('TOKEN')
        this.$router.go(0)
      } else if (command === 'c') {
        this.drawer = true
      } else if (command === 'a') {
        const activeName = this.$parent.$parent.activeName
        if (activeName != null) {
          if (this.$parent.$parent.me === true) {
            this.$parent.$parent.activeName = 'userMsg'
          } else {
            this.$router.push({
              path: '/user',
              query: { id: JSON.parse(localStorage.getItem('USER_INFO')).id }
            })
            localStorage.setItem('message', 'true')
            this.$router.go(0)
          }
        } else {
          this.toHome()
        }
      }
    },
    toHome () {
      this.$router.push({
        path: '/user',
        query: { id: JSON.parse(localStorage.getItem('USER_INFO')).id }
      })
      localStorage.setItem('message', 'true')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
