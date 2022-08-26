<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="">
        <template slot-scope="scope">
          {{ scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="角色名">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="角色描述">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | status2ChinessFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">分配权限</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="分配权限" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="角色id" hidden>
          <el-input v-model="form.roleId" placeholder="权限描述" />
        </el-form-item>
        <el-tree
          ref="tree"
          :data="treeData"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-expanded-keys="[]"
          :default-checked-keys="checkedKeys"
          :props="defaultProps"
          @check-change="handleCheckChange"
        />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleBtnSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAll, addRolePermissionsR, listPermissionIdsByRoleId } from '@/api/role'
import { getTreeData } from '@/api/permission'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        // draft: 'gray',
        1: 'danger'
      }
      return statusMap[status]
    },
    status2ChinessFilter(status) {
      const statusMap = {
        0: '正常',
        // draft: 'gray',
        1: '停用'
      }
      return statusMap[status]
    }

  },
  data() {
    return {
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        roleId: 0,
        permissionIds: []
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      checkedKeys: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getAll().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true
      this.form.permissionIds = []
      getTreeData().then(response => {
        this.treeData = response.data
        this.form.roleId = row.id
        listPermissionIdsByRoleId(row.id).then(response => {
          this.checkedKeys = response.data
          this.form.permissionIds = response.data
        })
      })
      // console.log(index, row)
    },
    handleDelete(index, row) {
      this.checkedKeys = []
    },
    handleBtnSubmit() {
      console.log(this.form.roleId)
      console.log(this.form.permissionIds)
      addRolePermissionsR(this.form).then(response => {
        this.$message.success(response.msg)
        this.form.roleId = 0
        this.form.permissionIds = []
        this.checkedKeys = []
      })
      this.dialogFormVisible = false
    },
    handleCheckChange(data, checked, indeterminate) {
      // if (checked) {
      //   this.form.permissionIds.push(data.id)
      // } else {
      //   this.uncheckHandle(data.id)
      // }
      // console.log(this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()))
      this.form.permissionIds = this.$refs.tree.getCheckedKeys()
      console.log(this.form.permissionIds)
      // console.log(this.$refs.tree.getHalfCheckedKeys())
    },
    uncheckHandle(permissionId) {
      for (var i = this.form.permissionIds.length; i > -1; i--) {
        if (permissionId === this.form.permissionIds[i]) {
          this.form.permissionIds.splice(i, 1)
        }
      }
    }
  }
}
</script>
