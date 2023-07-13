<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card v-loading="loading" class="tree-card">
        <!-- 用了一个行列布局 -->
        <tree-tools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 传入内容 -->
          <tree-tools slot-scope="{data}" :tree-node="data" @editDepts="editDepts" @delDepts="getDepartments" @addDepts="addDepts" />
        </el-tree>
      </el-card>
    </div>
    <add-dept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />
  </div>
</template>

<script>
import TreeTools from './component/tree-tools'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
import AddDept from './component/add-dept' // 引入新增部门组件
export default {
  components: {
    TreeTools, AddDept
  },
  data() {
    return {
      loading: false,
      company: { },
      departs: [],
      defaultProps: {
        label: 'name'
      },
      showDialog: false, // 显示窗体
      node: null
    }
  },
  created() {
    this.getDepartments() // 调用自身的方法
  },
  methods: {
    async getDepartments() {
      this.loading = true
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = tranListToTreeData(result.depts, '') // 需要将其转化成树形结构
      this.loading = false
      // console.log(result)
    },
    addDepts(node) {
      this.showDialog = true // 显示弹层
      // 因为node是当前的点击的部门， 此时这个部门应该记录下来,
      this.node = node
    },
    editDepts(node) {
      // 首先打开弹层
      this.showDialog = true
      this.node = node // 赋值操作的节点
      this.$refs.addDept.getDepartDetail(node.id) // 直接调用子组件中的方法 传入一个id
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>>

