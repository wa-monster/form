<template>
  <div class="router">
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
      </div>
    </div>
    <div class="myform-body">
      <el-table
        :data="routeData"
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
          label="路由名称"
          width="220"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="controller"
          label="controller"
          align="center"
          width="220"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="prefix"
          label="前缀"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="server"
          label="服务"
          align="center"
          width="180"
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
import Dialog from "@/components/dialog/routerDialog.vue";
import searchBtn from "@/components/little/searchBtn";
import { getRouterData, delRouterData } from "@/api/platform/router.js";
import ConfirmBox from "@/components/little/confirmBox";
export default {
  name: "Router",
  components: {
    Dialog,
    searchBtn,
    ConfirmBox
  },
  mixins: [mixin],
  data() {
    return {
      currentData: [],
      currentPage: 1,
      inputVisible: false,
      routeData: []
    };
  },
  computed: {
    filterData() {
      return this.routeData.filter(
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
          keywords: this.page.keywords
        };
        let res = await getRouterData(params);
        this.routeData = res.list;
        this.page.total = res.total;
      } catch (err) {
        throw err;
      }
    },
    dialogShow() {
      this.$refs["dialog"].show();
    },
    remove() {
      if (this.currentData.length === 0) {
        return;
      }
      this.$refs.confirmBox
        .comfirm(`确定要删除选中的${this.currentData.length}行内容?`)
        .then(async resolve => {
          await this.delete(this.routeData, this.currentData, delRouterData);
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
          await this.delete(this.routeData, item, delRouterData);
          reslove();
        })
        .catch(err => {
          console.log("取消");
        });
    },
    edit(item) {
      this.$refs["dialog"].show(this.depClone(item));
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
.router .btn-group {
  margin-bottom: 10px;
}

.search_input {
  width: 160px;
  margin-left: 10px;
}

.router .myform-footer {
  text-align: right;
  position: absolute;
  right: 10px;
  bottom: 25px;
}

.router .myform-footer {
  text-align: right;
}
</style>
