<template>
  <div id="bar">
    <div class="search">
      <div class="search_input">
        <input class="input" v-model="search.query" @keyup.enter="explore">
        <el-button @click="explore">探索一下</el-button>
      </div>
    </div>
    <UserStatus ref="userStatus" class="userStatus"></UserStatus>
    <UserMessage class="msg"></UserMessage>
  </div>
</template>

<script>
import UserStatus from './UserStatus'
import UserMessage from './UserMessage'
export default {
  name: 'SearchBar',
  components: {
    UserStatus,
    UserMessage
  },
  data () {
    return {
      search: {
        query: ''
      }
    }
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
  #bar {
    height: 70px;
    align-items: center;
  }

  .search /deep/ .input {
    width: 550px;
    height: 35px;
    font-size: 16px;
    border: 1px solid orange;
    outline: none;
    padding-left: 10px;
    border-bottom-left-radius: 6px;
    border-top-left-radius: 6px;
  }

  .search /deep/ .el-button {
    width: 100px;
    height: 39px;
    float: right;
    border-bottom-left-radius: 0px;
    border-top-left-radius: 0px;
    border-bottom-right-radius: 6px;
    border-top-right-radius: 6px;
    border: 2px solid orange;
    color: white;
    background-color: orange;
    font-size: 14px;
  }
  .search /deep/ .el-button:hover {
    color: white;
    background-color: chocolate;
    border: 2px solid chocolate;
  }
  .search_input {
    align-items: center;
    width: 660px;
    height: 45px;
    position: absolute;
    left: 50%;
    top: 10px;
    display: flex;
    justify-content: space-between;
    transform: translate(-50%);
  }
  .userStatus{
    position: absolute;
    right: 20%;
    top: 50%;
    transform: translateY(-50%);
  }
  //登录消息
  .msg {
    position: absolute;
    right: 14%;
    top: 12px;
    font-size: 30px;
  }
</style>
