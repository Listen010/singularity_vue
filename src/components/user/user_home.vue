<template>
  <div>
    <SearchBar ref="searchBar" class="Search_bar"></SearchBar>
    <div class="title">
      <div class="user">
        <div class="userAz">
          <el-avatar shape="square" :size="80"
                     src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </div>
        <div>
          <span class="userName">薛定谔的猫</span>
        </div>
        <div>
          <span class="userSign">个性签名：这个人很懒什么都没有写。</span>
        </div>
      </div>
      <div class="user_r">
        <table class="user_table" style="text-align: center">
          <tr>
            <td class="table_title" @click="toFans">粉丝</td>
            <td class="table_title" @click="toFollow">关注</td>
            <td class="table_title" @click="toDynamic">动态</td>
          </tr>
          <tr>
            <td class="table_count" @click="toFans">0</td>
            <td class="table_count" @click="toFollow">0</td>
            <td class="table_count" @click="toDynamic">0</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="tabs">
      <el-tabs :tab-position='tabPosition' v-model="activeName">
        <el-tab-pane label="主页" name="userHome">
        </el-tab-pane>
        <el-tab-pane v-if="me === true" label="消息" name="userMsg">消息</el-tab-pane>
        <el-tab-pane label="动态" name="userDynamic">动态</el-tab-pane>
        <el-tab-pane label="好友" name="userFriends">
          <div class="friendsTabs">
            <el-tabs type="card" :tab-position='tabPositionFriends' v-model="activeNameFriends">
              <el-tab-pane class="fPane" label="关注" name="follow">
                <div class="friendsDiv">
                </div>
              </el-tab-pane>
              <el-tab-pane class="fPane" label="粉丝" name="fans">
                <div class="friendsDiv">
                </div>
              </el-tab-pane>
              <el-tab-pane v-if="me === true" class="fPane" label="好友" name="friends">
                <div class="friendsDiv">
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-tab-pane>
        <el-tab-pane label="设置" v-if="me === true" name="userSetting">设置</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>import SearchBar from '../../util/SearchBar'

export default {
  components: {
    SearchBar
  },
  data () {
    return {
      me: true,
      activeName: 'userHome',
      tabPosition: 'top',
      tabPositionFriends: 'left',
      activeNameFriends: 'follow'
    }
  },
  created () {
    const userInfo = JSON.parse(localStorage.getItem('USER_INFO'))
    if (userInfo.id + '' !== this.$route.query.id + '') this.me = false
    var message = localStorage.getItem('message')
    if (message === 'true') this.activeName = 'userMsg'
    console.log(localStorage.getItem('USER_INFO'))
  },
  methods: {
    msgHandleCommand (command) {
      if (command === 'e') {
        this.$cookies.delete('TOKEN')
        this.$router.go(0)
      } else if (command === 'c') {
        this.drawer = true
      } else if (command === 'a') {
        alert(1)
      }
    },
    toFans () {
      this.activeName = 'userFriends'
      this.activeNameFriends = 'fans'
    },
    toFollow () {
      this.activeName = 'userFriends'
      this.activeNameFriends = 'follow'
    },
    toDynamic () {
      this.activeName = 'userDynamic'
    }
  }
}
</script>

<style lang="less" scoped>
.Search_bar {
  height: 90px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  position: relative;
  z-index: 2;
}

.title {
  height: 180px;
  width: 93%;
  background-color: #abcdef;
  position: relative;
  left: 50%;
  transform: translate(-50%);
}

.tabs {
  width: 93%;
  margin-top: 5px;
  left: 50%;
  position: relative;
  transform: translate(-50%);
}

//用户头像及其他
.user {
  position: absolute;
  width: 50%;
  left: 0px;
  bottom: 10px;
  height: 100px;
}

.userAz {
  position: absolute;
  left: 0px;
  bottom: 0px;
  margin-left: 20px;
  margin-bottom: 5px;
}

.userName {
  position: absolute;
  left: 120px;
  bottom: 40px;
  font-size: 17px;
  color: white;
}

.userSign {
  position: absolute;
  left: 120px;
  bottom: 15px;
  font-size: 13px;
  color: gray;
}

//用户头像右侧
.user_r {
  position: absolute;
  width: 50%;
  right: 0px;
  bottom: 5px;
  height: 100px;
}

.user_table {
  position: absolute;
  bottom: 10px;
  width: 140px;
  right: 50px;
}

.table_title {
  font-size: 13px;
  color: #1c6ca1;
}

.table_count {
  font-size: 16px;
}

.friendsDiv {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 99%;
  height: 800px;
  margin-bottom: 100px;
  margin-left: 5px;
  margin-top: 5px;
  border-radius: 8px;
}

.friendsTabs /deep/ #tab-follow {
  width: 180px;
  text-align: center;
  font-size: 16px;
}

.friendsTabs /deep/ #tab-fans {
  width: 180px;
  font-size: 16px;
  text-align: center;
}

.friendsTabs /deep/ #tab-friends {
  width: 180px;
  font-size: 16px;
  text-align: center;
}

.tabs /deep/ #tab-userHome {
  width: 120px;
  text-align: center;
  font-size: 18px;
}

.tabs /deep/ #tab-userMsg {
  width: 120px;
  text-align: center;
  font-size: 18px;
}

.tabs /deep/ #tab-userDynamic {
  width: 120px;
  text-align: center;
  font-size: 18px;
}

.tabs /deep/ #tab-userSetting {
  width: 120px;
  text-align: center;
  font-size: 18px;
}

.tabs /deep/ #tab-userFriends {
  width: 120px;
  text-align: center;
  font-size: 18px;
}
</style>
