<template>
  <div class="app-container" style="width: 40%;" >
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="角色名称">
        <el-input v-model="form.name" placeholder="角色名称" />
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="form.description" placeholder="角色描述" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addRole } from '@/api/role'

export default {
  data() {
    return {
      form: {
        name: '',
        description: ''
      }
    }
  },
  methods: {
    onSubmit() {
      var name = this.form.name
      var description = this.form.description
      if (name === '') {
        this.$message({
          type: 'error',
          message: '角色名为空'
        })
        return
      }
      if (description === '') {
        this.$message({
          type: 'error',
          message: '角色描述为空'
        })
        return
      }
      var data = {
        name: name,
        description: description
      }
      addRole(data).then(response => {
        this.$message({
          type: 'success',
          message: response.msg
        })
        console.log(response)
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error.msg
        })
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

