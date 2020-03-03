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
        <searchBtn
          :page="page"
          @load="load"
        ></searchBtn>
        <el-button size="medium">
          预览
        </el-button>
      </div>
    </div>
    <div class="myform-body">
      <el-table
        v-loading="loading"
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
        >
          <template slot-scope="scope">
            <ToolTip :text="formatter(scope.row)"></ToolTip>
          </template>
        </el-table-column>
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
              type="info"
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
    <ConfirmBox ref="confirmBox"></ConfirmBox>
  </div>
</template>

<script>
import mixin from "@/views/mixin";
import Dialog from "@/components/dialog/pageDialog.vue";
import searchBtn from "@/components/little/searchBtn";
import { getPageData, delPageData } from "@/api/platform/page.js";
import ConfirmBox from "@/components/little/confirmBox";
import ToolTip from '@/components/little/tooltip'
export default {
  name: "Page",
  components: {
    Dialog,
    searchBtn,
    ToolTip,
    ConfirmBox
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
    this.onload();
  },
  mounted() {},
  methods: {
    async load() {
      try {
        let params = {
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize,
          keywords: this.page.keywords
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
      console.log("add");
    },
    remove() {
      if (this.currentData.length === 0) {
        return;
      }
      this.$refs.confirmBox
        .comfirm(`确定要删除选中的${this.currentData.length}行内容?`)
        .then(async resolve => {
          await this.delete(this.pageData, this.currentData, delPageData);
          resolve();
          this.currentData = [];
        })
        .catch(err => {
          console.log("取消");
        });
    },
    handleDelete(item) {
      this.$refs.confirmBox
        .comfirm("确定要删除本行内容?")
        .then(async reslove => {
          await this.delete(this.pageData, item, delPageData);
          reslove();
        })
        .catch(err => {
          console.log("取消");
        });
    },
    edit(item) {
      // this.$refs["dialog"].show(this.depClone(item));
      console.log("edit");
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

.search_input {
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
