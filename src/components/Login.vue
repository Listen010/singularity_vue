<template>
  <div class="login_container">
    <!--登录框-->
    <div class="login_box">
      <!--登录表单-->
      <el-form label-width="0px" class="login_form" ref="loginFormRef" :model="formLogin" :rules="formLoginRules">
        <el-form-item class="zh" prop="phone">
          <el-input placeholder="用户名/手机号" v-model="formLogin.phone"></el-input>
        </el-form-item>
        <el-form-item class="zh" prop="pwd">
          <el-input placeholder="密码" show-password v-model="formLogin.pwd" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <!--按钮-->
        <el-form-item class="el-buttons">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="primary" @click="restForm">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formLogin: {
        phone: '18272894758',
        pwd: ''
      },
      formLoginRules: {
        phone: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 12,
            message: '请输入正确的用户名或手机号',
            trigger: 'blur'
          },
          {
            pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
            message: '用户名只存在数字字母下划线'
          }
        ],
        pwd: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 12,
            message: '密码为3-12位',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    restForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const res = (await this.$http.post('sign/in', this.formLogin))
        const data = res.data
        if (data.code !== 200) return this.$message.warning('登录失败')
        this.$message.success('登录成功')
        this.$cookies.set('TOKEN', data.data, 7)
        await this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .login_container {
    background-color: palegreen;
    height: 100%;
  }

  .login_box {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 370px;
    height: 300px;
    background-color: white;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
  }

  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 0px;
    box-sizing: border-box;
    height: 75%;
  }

  .zh {
    width: 80%;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
  }

  .el-buttons {
    width: 60%;
    margin-left: auto;
    margin-right: auto;
  }

  .el-button {
    margin: 22px;
  }
</style>
