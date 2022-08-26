<template>
  <div class="app-container" style="width: 40%;" >
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="权限名称">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in selectData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="权限名称">
        <el-input v-model="form.name" placeholder="权限名称" />
      </el-form-item>
      <el-form-item label="权限描述">
        <el-input v-model="form.description" placeholder="权限描述" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addPermission, getAll } from '@/api/permission'

export default {
  data() {
    return {
      form: {
        name: '',
        description: ''
      },
      selectData: [],
      value: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    onSubmit() {
      var name = this.form.name
      var description = this.form.description
      var value = this.value
      if (name === '') {
        this.$message({
          type: 'error',
          message: '权限名为空'
        })
        return
      }
      if (description === '') {
        this.$message({
          type: 'error',
          message: '权限描述为空'
        })
        return
      }
      var data = {
        name: name,
        description: description,
        parentId: value
      }
      addPermission(data).then(response => {
        this.$message({
          type: 'success',
          message: response.msg
        })
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
    },
    fetchData() {
      getAll().then(response => {
        this.selectData = response.data.items
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

