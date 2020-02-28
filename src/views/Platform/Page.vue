<template>
  <div class="pageView">
    <div class="myform-header">
      <div class="btn-group">
        <el-button
          type="primary"
          size="medium"
          @click="dialogShow"
        >
          添加
        </el-button>
        <el-button
          type="danger"
          size="medium"
          @click="remove"
        >
          删除
        </el-button>
        <el-input
          v-if="inputVisible"
          ref="searchInput"
          v-model="page.keywords"
          class="searchInput"
          size="medium"
          placeholder="请输入服务名称"
          @blur="clearVal"
        ></el-input>
        <el-button
          v-else
          size="medium"
          @click="showInput"
        >
          查询
        </el-button>
        <el-button size="medium">
          预览
        </el-button>
      </div>
    </div>
    <div class="myform-body">
      <el-table
        :data="filterData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="服务名称"
          width="220"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="components"
          label="组件集"
          align="center"
          :formatter="formatter"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          width="180"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
            <el-button
              size="mini"
              @click="edit(scope.row)"
            >
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="myform-footer">
      <el-pagination
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        :background="true"
        @size-change="sizeChange"
        @current-change="currentChange"
      ></el-pagination>
    </div>
    <Dialog ref="dialog"></Dialog>
  </div>
</template>

<script>
import mixin from "@/views/mixin";
import Dialog from "@/components/dialog/pageDialog.vue";
import { getPageData, delPageData } from "@/api/platform/page.js";
export default {
  name: "Page",
  components: {
    Dialog
  },
  mixins: [mixin],
  data() {
    return {
      currentData: [],
      currentPage: 1,
      inputVisible: false,
      pageData: []
    };
  },
  computed: {
    filterData() {
      return this.pageData.filter(
        data =>
          !this.page.keywords ||
          data.name.toLowerCase().includes(this.page.keywords.toLowerCase())
      );
    }
  },
  created() {
    this.load();
  },
  mounted() {},
  methods: {
    async load() {
      try {
        let params = {
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize,
          keywords:this.page.keywords
        };
        let res = await getPageData(params);
        this.pageData = res.list;
        this.page.total = res.total;
      } catch (err) {
        throw err;
      }
    },
    formatter(row) {
      return JSON.stringify(row.components);
    },
    dialogShow() {
      // this.$refs["dialog"].show();
      console.log('add');
    },
    remove() {
      if (this.currentData && this.currentData.length !== 0) {
        this.delete(this.pageData, this.currentData, delPageData);
        this.$message({ message: "删除成功", type: "success" });
        this.currentData = [];
      } else {
        this.$message("请先选择一条数据");
      }
    },
    handleDelete(item) {
      this.delete(this.pageData, item, delPageData);
    },
    edit(item) {
      // this.$refs["dialog"].show(this.depClone(item));
      console.log('edit');
    },
    depClone(data) {
      return JSON.parse(JSON.stringify(data));
    },
    handleSelectionChange(val) {
      this.currentData = this.depClone(val);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.searchInput.$refs.input.focus();
      });
    },
    clearVal() {
      if (this.page.keywords == "") {
        this.inputVisible = false;
      } else {
        this.inputVisible = true;
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.pageView .btn-group {
  margin-bottom: 10px;
}

.pageView .searchInput {
  width: 160px;
  margin-left: 10px;
}

.pageView .myform-footer {
  text-align: right;
  position: absolute;
  right: 10px;
  bottom: 25px;
}

.pageView .myform-footer {
  text-align: right;
}
</style>
