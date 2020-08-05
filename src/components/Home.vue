<template>
  <el-container class="home">
    <el-header height="50px">
      <div v-if="login == true " class="loginDiv">
        <UserStatus></UserStatus>
      </div>
      <div v-if="login == true " class="msg"><UserMessage></UserMessage></div>
      <div v-else class="loginDiv">
        <span><router-link class="loginUrl" to="/login"><el-avatar>登录</el-avatar></router-link></span>
      </div>
    </el-header>
    <el-container>
      <el-main height="50%">
        <img class="search_img" src="../assets/logo.png" height="100" width="100"/>
        <div class="search">
          <div class="search_input">
            <input id="search_input" class="input" v-model="search.query" @keyup.enter="explore">
            <el-button @click="explore">探索一下</el-button>
          </div>
        </div>
      </el-main>
      <el-footer height="50%">
        <div class="circle">
          <div>
          </div>
        </div>
      </el-footer>
    </el-container>
    <el-footer height="25px" class="footer">Footer</el-footer>
  </el-container>
</template>

<script>
import UserStatus from '../util/UserStatus'
import UserMessage from '../util/UserMessage'

export default {
  components: {
    UserStatus,
    UserMessage
  },
  data () {
    return {
      login: false,
      hello: null,
      circle: null,
      search: {
        query: ''
      },
      timer: null
    }
  },
  created () {
    const token = this.$cookies.get('TOKEN')
    if (token != null) {
      this.login = true
    }
  },
  mounted () {
    document.getElementById('search_input').focus()
  },
  methods: {
    async explore () {
      if (Object.keys(this.search.query).length !== 0 && (this.search.query).split(' ').join('').length !== 0) {
        this.$message.info('探索了:' + this.search.query)
        await this.$router.push({
          path: '/search',
          query: { q: this.search.query }
        })
      }
    }
  }
}

</script>

<style lang="less" scoped>
  .home {
    height: 100%;
  }

  .el-header {
    display: flex;
    justify-content: space-around;
    padding-left: 0px;
    padding-right: 0px;
    align-items: center;
  }

  .user_drop {
    margin-right: 100px;
  }

  .loginUrl {
    margin-right: 100px;
    text-decoration: none;
  }

  .hello {
    font-size: 14px;
    margin-right: 20px;
  }

  .search {
    width: 800px;
    height: 250px;
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%);
  }

  .search_input {
    align-items: center;
    width: 660px;
    height: 45px;
    position: absolute;
    left: 50%;
    top: 70%;
    display: flex;
    justify-content: space-between;
    transform: translate(-50%);
  }

  .search_img {
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translate(-50%);
  }

  .search /deep/ .input {
    width: 550px;
    height: 41px;
    font-size: 16px;
    border: 1px solid orange;
    outline: none;
    padding-left: 10px;
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
  }

  .search /deep/ .el-button {
    width: 110px;
    height: 45px;
    float: right;
    border: 2px solid orange;
    color: white;
    background-color: orange;
    font-size: 16px;
    border-bottom-left-radius: 0px;
    border-top-left-radius: 0px;
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
  }

  .search /deep/ .el-button:hover {
    color: white;
    background-color: chocolate;
    border: 2px solid chocolate;
  }

  .circle {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    //box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    width: 800px;
    height: 370px;
    position: absolute;
    padding: 40px;
    left: 50%;
    top: 45%;
    transform: translate(-50%);
  }

  .footer {
    background-color: lavenderblush;
    align-content: center;
  }

  .el-main {
    background-color: white;
  }

  //登录头像
  .loginDiv {
    position: absolute;
    right: 80px;
    top: 5px;
  }

  //登录消息
  .msg {
    position: absolute;
    right: 90px;
    top: 5px;
    font-size: 30px;
  }

</style>
