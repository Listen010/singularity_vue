<template>
  <el-dropdown class="user_drop" @command="handleCommand">
          <span class="el-dropdown-link" v-on:click="toHome">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="a">
        <div align="center">
          <span>个人主页</span>
        </div>
      </el-dropdown-item>
      <el-dropdown-item command="f" disabled>
        <div style="height: 25px;width: 160px;margin-top: 10px">
          <span style="font-size: 14px;margin-right: 50px;margin-top: 30px">金币：</span>
          <span style="font-size: 14px;">银币：</span>
        </div>
      </el-dropdown-item>
      <el-dropdown-item command="g" disabled>
        <div style="height: 60px;width: 180px;margin-top: 10px">
          <table width="180px">
            <tr align="center">
              <td width="60px">
                <div style="height: 20px">关注</div>
              </td>
              <td width="60px">
                <div style="height: 20px">粉丝</div>
              </td>
              <td width="60px">
                <div style="height: 20px">动态</div>
              </td>
            </tr>
            <tr align="center">
              <td width="60px">
                <div style="height: 20px">0</div>
              </td>
              <td width="60px">
                <div style="height: 20px">0</div>
              </td>
              <td width="60px">
                <div style="height: 20px">0</div>
              </td>
            </tr>
          </table>
        </div>
      </el-dropdown-item>
      <el-dropdown-item command="c">搜索设置</el-dropdown-item>
      <el-dropdown-item command="d" disabled>充值</el-dropdown-item>
      <el-dropdown-item command="e" divided>退出</el-dropdown-item>
    </el-dropdown-menu>
    <el-drawer
      title="搜索设置"
      :visible.sync="drawer"
      :with-header="false"
      :before-close="titleBox"
      direction="ttb"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...'
            : '确 定' }}
          </el-button>
        </div>
      </div>
    </el-drawer>
  </el-dropdown>
</template>

<script>export default {
  name: 'UserStatus',
  data () {
    return {
      loading: null,
      user: null,
      userId: null,
      drawer: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px'
    }
  },
  async created () {
    const token = this.$cookies.get('TOKEN')
    const userInfo = JSON.parse(localStorage.getItem('USER_INFO'))
    if (token == null) {
      this.user = '登录'
      return
    }
    if (userInfo == null) {
      const res = (await this.$http.get('/api/v1/user')).data
      if (res.code !== 200) {
        this.$message.info('登录已失效，请重新登录!')
        this.user = '登录'
      } else {
        this.user = res.data.name
        this.userId = res.data.id
        localStorage.setItem('USER_INFO', JSON.stringify(res.data))
      }
    } else {
      this.user = userInfo.name
      this.userId = userInfo.id
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'e') {
        this.$cookies.delete('TOKEN')
        localStorage.removeItem('USER_INFO')
        this.$router.push({
          path: '/'
        })
        this.$router.go(0)
      } else if (command === 'c') {
        this.drawer = true
      } else if (command === 'a') {
        this.toHome()
      }
    },
    toHome () {
      this.$router.push({
        path: '/user',
        query: { id: this.userId }
      })
    },
    titleBox (done) {
      if (this.loading) {
        return
      }
      this.$messageBox.confirm('需要保存设置吗？')
        .then(_ => {
          this.loading = true
          this.timer = setTimeout(() => {
            done()
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false
            }, 400)
          }, 2000)
        })
        .catch(_ => {
          done()
        })
    },
    cancelForm () {
      this.loading = false
      this.drawer = false
      clearTimeout(this.timer)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
