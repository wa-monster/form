<template>
  <div class="server">
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
        :data="serverData"
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
          prop="directives"
          label="指令集"
          align="center"
          :formatter="formatter"
        >
          <template slot-scope="scope">
            <ToolTip :text="formatter(scope.row)"></ToolTip>
          </template>
        </el-table-column>
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
    <ConfirmBox ref="confirmBox"></ConfirmBox>
  </div>
</template>

<script>
import mixin from "@/views/mixin";
import Dialog from "@/components/dialog/serverDialog.vue";
import searchBtn from "@/components/little/searchBtn";
import { getServerData, delServerData } from "@/api/platform/server.js";
import ConfirmBox from "@/components/little/confirmBox";
import ToolTip from '@/components/little/tooltip'
export default {
  name: "Server",
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
      serverData: []
    };
  },
  computed: {
    filterData() {
      return this.serverData.filter(
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
        let res = await getServerData(params);
        this.serverData = res.list;
        this.page.total = res.total;
      } catch (err) {
        throw err;
      }
    },
    formatter(row) {
      return JSON.stringify(row.directives);
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
          await this.delete(this.serverData, this.currentData, delServerData);
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
          await this.delete(this.serverData, item, delServerData);
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
.server .btn-group {
  margin-bottom: 10px;
}

.search_input {
  width: 160px;
  margin-left: 10px;
}

.server .myform-footer {
  text-align: right;
  position: absolute;
  right: 10px;
  bottom: 25px;
}

.server .myform-footer {
  text-align: right;
}
</style>
