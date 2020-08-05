<template>
  <el-container class="search_home">
    <el-header height="70px">
      <div class="search">
        <div class="search_input">
          <input class="input" type="text" v-model="query" @keyup.enter="search_explore">
          <el-button @click="search_explore">探索一下</el-button>
        </div>
      </div>
    </el-header>
    <el-divider></el-divider>
    <el-main>
      <div class="search_res">
        <table class="table" v-for="(item,index) in searchData" :key="index">
          <td align="left" colspan="3">
            <a class="title" href="*">{{ item.title }}</a>
          </td>
          <tr align="left">
            <td colspan="3">
              <span class="time">{{ timestampToTime(item.time) }} - </span>
              <span class="context">{{ item.context }}</span>
            </td>
          </tr>
          <tr>
            <td class="name">{{ item.username }}</td>
            <td width="80">{{ timestampToTime(item.time) }}</td>
            <td width="80">Type:{{ item.type }}</td>
          </tr>
        </table>
      </div>
    </el-main>
    <el-footer height="20">
      footer
    </el-footer>
  </el-container>
</template>

<script>export default {
  data () {
    return {
      searchData: null,
      query: null
    }
  },
  async created () {
    if ((window.location.href).split(this.$route.path).length < 2) {
      await this.$router.push('')
    }
    this.query = this.$route.query.q
    await this.search_explore()
    console.log(this.query)
    console.log(this.searchData)
  },
  methods: {
    timestampToTime: function (unix) {
      const date = new Date(unix * 1000)
      const Y = date.getFullYear() + '-'
      const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      const D = date.getDate() + ' '
      return Y + M + D
    },
    async search_explore () {
      const key = this.query.trim()
      if (!key) return
      this.$message.info('探索了:' + this.query)
      const query = (window.location.href).split(this.$route.path)[1]
      const res = (await this.$http.get('/search' + query)).data
      if (res.code !== 200) {
        this.$message.info(res.msg)
      }
      this.searchData = res.data.search_item
      await this.$router.push({
        path: '/search',
        query: { q: this.query }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .el-header {
  }

  .el-footer {
    background-color: saddlebrown
  }

  .table {
    margin-top: 30px;
    border: lightcoral 1px solid;
    margin-left: 100px;
    font-family: Helvetica;
    font-size: 14px;
  }

  .title {
    font-size: 18px;
    text-decoration: none;
  }

  .time {
    font-size: 14px;
    color: gray;
  }

  .search_input {
    align-items: center;
    width: 660px;
    height: 45px;
    display: flex;
    margin-left: 100px;
    margin-top: 20px;
  }

  .search_res {
    margin-top: -30px;
    width: 770px;
  }

  .search /deep/ .input {
    width: 550px;
    height: 41px;
    border-radius: 0px;
    font-size: 16px;
    border: 1px solid orange;
    outline: none;
    padding-left: 10px;
  }

  .search /deep/ .el-button {
    width: 110px;
    height: 45px;
    float: right;
    border-radius: 0px;
    border: 2px solid orange;
    color: white;
    background-color: orange;
    font-size: 16px;
  }

  .search /deep/ .el-button:hover {
    color: white;
    background-color: chocolate;
    border: 2px solid chocolate;
  }

  .body {
    font-size: 14px;
  }
</style>
