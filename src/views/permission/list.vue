<template>
  <div class="app-container">
    <!-- <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="权限名">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="权限描述">
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
    </el-table> -->

    <el-table :data="list" style="width: 100%;margin-bottom: 20px;" row-key="id" border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column align="center" label="ID" width="">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="id" label="权限id" hidden />
      <el-table-column prop="label" label="权限名" sortable />
      <el-table-column prop="description" label="权限描述" sortable />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column class-name="status-col" label="状态" width="" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | status2ChinessFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          <el-button size="mini" type="danger" @click="open(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { getTreeData, deletePermission } from '@/api/permission'

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
      list: [],
      listLoading: true,
      permissionIds: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getTreeData().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      // 删除权限
      this.permissionIds.push(row.id)
      this.getPermissionIds(row)
      var data = {
        permissionIds: this.permissionIds
      }
      console.log(data)
      deletePermission(data).then(response => {
        console.log(response.msg)
        this.fetchData()
      })
      this.permissionIds = []
    },
    getPermissionIds(permissionRow) {
      var childrens = permissionRow.children
      if (childrens) {
        for (var i = 0; i < childrens.length; i++) {
          var children = childrens[i]
          var permissionId = children.id
          this.permissionIds.push(permissionId)
          if (children.children) {
            this.getPermissionIds(children)
          }
        }
      }
    },
    open(index, row) {
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(index, row)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
