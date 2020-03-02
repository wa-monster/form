<template>
  <div
    v-loading="loading"
    class="menuView"
  >
    <div class="myform-header">
      <div class="btn-group">
        <el-button
          type="primary"
          size="medium"
          @click="addMenu"
        >
          添加
        </el-button>
        <el-button
          type="primary"
          size="medium"
          @click="addChild(currentData)"
        >
          添加子菜单
        </el-button>
        <el-button
          type="danger"
          size="medium"
          @click="remove(currentData)"
        >
          删除
        </el-button>
        <el-button
          size="medium"
          @click="handleSubmit"
        >
          保存
        </el-button>
      </div>
    </div>
    <div class="myform-body">
      <div class="myform-body-left">
        <el-input
          v-model="keywords"
          placeholder="请输入菜单名称"
          prefix-icon="el-icon-search"
        ></el-input>
        <div class="tree-box">
          <el-scrollbar class="page_scrollbar">
            <el-tree
              ref="tree"
              :data="menuData"
              :props="defaultProps"
              :filter-node-method="filterNode"
              node-key="id"
              :default-expanded-keys="[1]"
              :highlight-current="true"
              @node-click="handleNodeClick"
            ></el-tree>
          </el-scrollbar>
        </div>
      </div>
      <div class="myform-body-right">
        <el-form
          ref="menuForm"
          label-position="left"
          label-width="80px"
          :model="formData"
          :rules="rules"
          size="medium"
        >
          <el-form-item
            label="名称"
            prop="name"
          >
            <el-input
              ref="nameInput"
              v-model="formData.name"
              placeholder="请输入菜单名称"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="描述"
            prop="des"
          >
            <el-input
              v-model="formData.des"
              placeholder="请输入菜单描述"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="地址"
            prop="address"
          >
            <el-input
              v-model="formData.address"
              placeholder="请输入菜单地址"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="类型"
            prop="type"
          >
            <el-radio-group v-model="formData.type">
              <el-radio :label="0">
                菜单
              </el-radio>
              <el-radio :label="1">
                页面
              </el-radio>
              <el-radio :label="2">
                按钮
              </el-radio>
              <el-radio :label="3">
                ajax
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="是否可用"
            prop="disabled"
          >
            <el-radio-group v-model="formData.disabled">
              <el-radio :label="0">
                是
              </el-radio>
              <el-radio :label="1">
                否
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="是否隐藏"
            prop="hide"
          >
            <el-radio-group v-model="formData.hide">
              <el-radio :label="0">
                是
              </el-radio>
              <el-radio :label="1">
                否
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <ConfirmBox ref="confirmBox"></ConfirmBox>
    </div>
  </div>
</template>

<script>
import {
  getMenuData,
  addMenuData,
  addMenuChildData,
  editMenuData,
  delMenuData
} from "@/api/platform/menu.js";
import { Loading } from "element-ui";
import ConfirmBox from "@/components/little/confirmBox";
export default {
  name: "Page",
  components: {
    ConfirmBox
  },
  data() {
    return {
      keywords: "",
      menuData: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      formData: {
        id: "",
        pId: "",
        name: "",
        des: "",
        address: "",
        type: 0,
        disabled: 0,
        hide: 1
      },
      currentData: null,
      type: "add",
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        des: [{ required: true, message: "请输入描述", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        disabled: [
          { required: true, message: "请选择是否可用", trigger: "change" }
        ],
        hide: [{ required: true, message: "请选择是否隐藏", trigger: "change" }]
      },
      loading:false
    };
  },
  computed: {},
  watch: {
    keywords(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    this.load();
  },
  mounted() {},
  methods: {
    async load() {
      try {
        let params = {};
        this.loading=true;
        let res = await getMenuData(params);
        this.loading=false;
        this.menuData = res.data;
      } catch (err) {
        throw err;
      }
    },
    addMenu() {
      this.type = "add";
      this.currentData = null;
      this.$refs.menuForm.resetFields();
      this.$refs.nameInput.focus();
    },
    addChild(node) {
      if (!node) {
        this.$message("请先选择一个菜单");
        return;
      }
      this.type = "add";
      this.$refs.menuForm.resetFields();
      this.$refs.nameInput.focus();
      this.formData.pId = node.id;
    },
    handleNodeClick(data) {
      this.type = "edit";
      this.$refs.menuForm.resetFields();
      this.currentData = data;
      for (let key in this.formData) {
        this.formData[key] = this.currentData[key];
      }
    },
    async handleSubmit() {
      let canSubmit = true;
      this.$refs.menuForm.validate(valid => {
        if (!valid) {
          canSubmit = false;
        }
      });
      if (canSubmit) {
        let res;
        if (this.type == "add") {
          if (this.formData.pId == "") {
            res = await addMenuData(this.formData);
          } else {
            res = await addMenuChildData(this.formData);
          }
          this.$refs.menuForm.resetFields();
          this.load();
          this.$message("添加成功");
        } else {
          res = await editMenuData(this.formData);
          this.$refs.menuForm.resetFields();
          this.load();
          this.$message("修改成功");
        }
      }
    },
    async remove(node) {
      if (!node) {
        return;
      }
      this.$refs.confirmBox
        .comfirm("确定要删除本行内容?")
        .then(async reslove => {
          let res = await delMenuData({ id: node.id });
          this.$refs.menuForm.resetFields();
          this.load();
          reslove();
        })
        .catch(err => {
          console.log("取消");
        });
    },
    filterNode(value, data, node) {
      if (!value) {
        return true;
      }
      let level = node.level;
      let _array = [];
      this.getReturnNode(node, _array, value);
      let result = false;
      _array.forEach(item => {
        result = result || item;
      });
      return result;
    },
    getReturnNode(node, _array, value) {
      let isPass =
        node.data &&
        node.data[this.defaultProps["label"]] &&
        node.data[this.defaultProps["label"]].indexOf(value) !== -1;
      isPass ? _array.push(isPass) : "";
      if (!isPass && node.level != 1 && node.parent) {
        this.getReturnNode(node.parent, _array, value);
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.menuView {
  height: 100%;
}

.menuView .btn-group {
  margin-bottom: 10px;
}

.menuView .myform-body {
  height: calc(100% - 46px);
  position: relative;
}

.menuView .myform-footer {
  text-align: right;
}

.menuView .myform-body-left {
  width: 240px;
  height: 100%;
  position: absolute;
}

.menuView .myform-body-left .tree-box {
  margin-top: 10PX;
  height: calc(100% - 50px);
  overflow: auto;
}

.menuView .myform-body-right {
  margin-left: 250px;
  height: 100%;
}
</style>
