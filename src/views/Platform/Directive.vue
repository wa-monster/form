<template>
  <div class="instruction">
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
        :data="instructionData"
        border
        style="width: 100%"
        height="500"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="指令名称"
          width="180"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="code"
          label="代码"
          align="center"
          width="180"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="params"
          label="参数描述"
          align="center"
          :show-overflow-tooltip="true"
          :formatter="formatter"
        ></el-table-column>
        <el-table-column
          prop="fn"
          label="功能"
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
import Dialog from "@/components/dialog/instructionDialog.vue";
import searchBtn from "@/components/little/searchBtn";
import ConfirmBox from "@/components/little/confirmBox";
import {
  getDirectiveData,
  delDirectiveData
} from "@/api/platform/directive.js";
export default {
  name: "Directive",
  components: {
    Dialog,
    searchBtn,
    ConfirmBox
  },
  mixins: [mixin],
  data() {
    return {
      inputVisible: false,
      currentData: [],
      instructionForm: {
        name: "",
        code: "",
        fn: "",
        type: 0,
        params: [
          { label: "", name: "", type: 0, default: "" },
          { label: "", name: "", type: 0, default: "" }
        ]
      },
      instructionData: []
    };
  },
  computed: {
    filterData() {
      return this.instructionData.filter(
        data =>
          !this.page.keywords ||
          data.name.toLowerCase().includes(this.page.keywords.toLowerCase())
      );
    }
  },
  created() {
    this.load();
  },
  methods: {
    async load() {
      try {
        let params = {
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize,
          keywords: this.page.keywords
        };
        let res = await getDirectiveData(params);
        this.instructionData = res.list;
        this.page.total = res.total;
      } catch (err) {
        throw err;
      }
    },
    dialogShow() {
      this.$refs["dialog"].show();
    },
    depClone(data) {
      return JSON.parse(JSON.stringify(data));
    },
    handleSelectionChange(val) {
      this.currentData = this.depClone(val);
    },
    formatter(row) {
      return JSON.stringify(row.params);
    },
    resetForm() {
      this.$refs["instructionForm"].resetFields();
      this.$refs["childForm"].forEach(item => {
        item.resetFields();
      });
      this.dialogFormVisible = false;
    },
    remove() {
      if (this.currentData === 0) {
        return;
      }
      this.$refs.confirmBox
        .comfirm(`确定要删除选中的${this.instructionData.length}行内容?`)
        .then(async resolve => {
          await this.delete(
            this.instructionData,
            this.currentData,
            delDirectiveData
          );
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
          await this.delete(this.instructionData, item, delDirectiveData);
          reslove();
        })
        .catch(err => {
          console.log("取消");
        });
    },
    edit(item) {
      this.$refs["dialog"].show(this.depClone(item));
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
<style>
.instruction .btn-group {
  margin-bottom: 10px;
}
.search_input {
  width: 160px;
  margin-left: 10px;
}
.instruction .myform-footer {
  text-align: right;
  position: absolute;
  right: 10px;
  bottom: 25px;
}
.sec-form .el-form-item {
  text-align: left;
}
.sec-form > .el-form-item > .el-form-item {
  margin-bottom: 22px;
}
</style>