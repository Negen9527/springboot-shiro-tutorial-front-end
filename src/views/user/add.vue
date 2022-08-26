<template>
  <div class="app-container" style="width: 40%;" >
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="账号">
        <el-input v-model="form.username" placeholder="username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" placeholder="password" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addUser } from '@/api/user'

export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      var username = this.form.username
      var password = this.form.password
      if (username === '') {
        this.$message('账号为空')
        return
      }
      if (password === '') {
        this.$message('密码为空')
        return
      }
      var data = {
        username: this.form.username,
        password: this.form.password
      }
      addUser(data).then(response => {
        this.$message({
          type: 'success',
          message: response.msg
        })
        console.log(response)
      }).catch(error => {
        this.$message(error.msg)
        console.log(error.msg)
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

