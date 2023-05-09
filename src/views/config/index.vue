<template>
  <div class="app-container">
    <el-button style="margin-bottom: 20px" type="primary" @click="showForm">添加样式</el-button>

    <el-table :data="templateList" border fit style="width: 100%">
      <el-table-column align="center" label="配置ID" min-width="100">
        <template slot-scope="scope">
          {{ scope.row.config_id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="样式ID" min-width="100px">
        <template slot-scope="scope">
          {{ scope.row.config_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="左侧大图" min-width="180px">
        <template slot-scope="scope">
          {{ scope.row.left_img }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="背景大图" min-width="180px">
        <template slot-scope="scope">
          {{ scope.row.back_img }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="PCW背景大图" min-width="180px">
        <template slot-scope="scope">
          {{ scope.row.pcw_back_img }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="背景色" min-width="180px">
        <template slot-scope="scope">
          {{ scope.row.bgc_start }}-{{ scope.row.bgc_end }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="时长(S)" min-width="180px">
        <template slot-scope="scope">
          {{ scope.row.dur }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="高亮文本" min-width="180px">
        <template slot-scope="scope">
          {{ scope.row.hl_text_color }}
        </template>
      </el-table-column>
       <el-table-column align="center" label="普通文本" min-width="180px">
        <template slot-scope="scope">
          {{ scope.row.text_color }}
        </template>
      </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="动态素材" min-width="180px">
        <template slot-scope="scope">
          {{ scope.row.dynamic_imgs }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="PCW动态素材" min-width="180px">
        <template slot-scope="scope">
          {{ scope.row.pcw_dynamic_imgs }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="更新时间" min-width="150px">
        <template slot-scope="scope">
          {{ scope.row.update_time }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" fixed="right" width="150px">
        <template slot-scope="scope">
          <el-row>
            <el-button size="mini" style="margin-bottom: 20px" type="primary" @click="editFlyTemplate(scope.row)">修改样式</el-button>
          </el-row>
          <el-row>
            <el-button size="mini" style="margin-bottom: 20px" type="primary" @click="testFlyTemplate(scope.row)">模拟发送</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="formTitle"
      :visible.sync="isShowForm"
      :before-close="beforeFormClose"
      @close="closeForm"
      width="40%">
      <el-form :model="formData" label-width="100px" ref="formData" :rules="formRules">
         <el-form-item label="样式ID：" prop="config_name">
          <el-input v-model="formData.config_name" placeholder="请输入样式ID" :disabled="formTitle === '编辑样式'"></el-input>
         </el-form-item>
         <el-form-item label="左侧大图：" prop="left_img">
          <el-input v-model="formData.left_img" placeholder="图片地址"></el-input>
         </el-form-item>

         <el-form-item label="背景大图：" prop="back_img">
          <el-input v-model="formData.back_img" placeholder="图片地址"></el-input>
         </el-form-item>
         <el-form-item label="PCW背景大图：" prop="pcw_back_img">
          <el-input v-model="formData.pcw_back_img" placeholder="图片地址"></el-input>
         </el-form-item>
         <el-form-item label="时长(S)：" prop="dur">
          <el-input v-model="formData.dur" placeholder="时长"></el-input>
         </el-form-item>
         <el-form-item label="背景色：" prop="bgc">
          <el-input v-model="formData.bgc" placeholder="开始色-结束色"></el-input>
         </el-form-item>
         <el-form-item label="高亮文本：" prop="hl_text_color">
          <el-input v-model="formData.hl_text_color" placeholder="高亮文本"></el-input>
         </el-form-item>
         <el-form-item label="普通文本：" prop="text_color">
          <el-input v-model="formData.text_color" placeholder="普通文本"></el-input>
         </el-form-item>
         <el-form-item label="动态素材：" prop="dynamic_imgs">
          <el-input v-model="formData.dynamic_imgs" placeholder="动态素材"></el-input>
         </el-form-item>
         <el-form-item label="PCW动态素材：" prop="pcw_dynamic_imgs">
          <el-input v-model="formData.pcw_dynamic_imgs" placeholder="PCW动态素材"></el-input>
         </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeForm">取消</el-button>
        <el-button type="primary" @click="addOrEditFly">提交</el-button>
      </span>
    </el-dialog>
    <el-row>
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 50]"
        layout="total,sizes,prev, pager, next"
        :total="totalCount"
      ></el-pagination>
    </el-row>

  </div>
</template>
<script>
import {
   listFlyTemplateAction,
   editFlyTemplateAction,
   addFlyTemplateAction,
   testFlyTemplateAction
   } from '@/api/config'

const defaultFormModel = {
    config_id: 0,
    config_name: '',
    left_img: '',
    back_img: '',
    pcw_img: '',
    dur: 1,
    hl_text_color: '',
    text_color: '',
    dynamic_imgs: '',
    pcw_dynamic_imgs: '',
    bgc: '',
}

export default {
  components: {},
  name: 'index',
  data() {
    const validateConfigText = (rule, value, callback) => {
          if (value === '' || (typeof value === 'string' && value.replace(/\s/g, '').length === 0)) {
            return callback(new Error('时长不能为空'))
          } else if (!/^[1-9]+[0-9]*]*$/.test(value)) {
            return callback(new Error('时长只能由数字组成'))
          }
          return callback()
        };
    return {

      // 列表相关
      currentPage: 1,
      pageSize: 20,
      totalCount: 0,
      templateList: [],
      configList: [],

      // 表单相关
      formTitle: "新增样式",
      isShowForm: false,
      formData: Object.assign({}, defaultFormModel),
      activityOptions: [],

      //表单check
      formRules: {
          config_name: [{required: true, message: "不能为空", trigger: 'blur'}],
          left_img: [{required: true, message: "不能为空", trigger: 'blur'}],
          back_img: [{required: true, message: "不能为空", trigger: 'blur'}],
          pcw_back_img: [{required: true, message: "不能为空", trigger: 'blur'}],
          dur: [{required: true, validator: validateConfigText, trigger: 'blur'}],
      }
    }
  },
  mounted() {
      this.listFlyTemplate()
    },
  methods: {

      // 处理当前页变化
      handleCurrentChange(val) {
        this.currentPage = val
        this.listFlyTemplate()
      },

      // 处理pageSize变化
      handleSizeChange(val) {
        this.pageSize = val
        this.listFlyTemplate()
      },

      // 确认是否关闭表单
      beforeFormClose(done) {
        this.$confirm("确定要关闭吗？", "提示").then(
          function(){
            done()
          }
        ).catch(()=>{})
      },
      // 关闭操作
      closeForm() {
        this.isShowForm = false
        this.formTitle = "新增样式"
        this.$refs.formData.clearValidate()
        this.formData = Object.assign({}, defaultFormModel)
      },
      //展示表单
      showForm() {
        this.isShowForm = true
      },
      //新增提交
      addFly(row) {
         addFlyTemplateAction(row).then(
            response => {
              if(response && response.code === 20000){
                this.listFlyTemplate()
                this.closeForm()
                this.$message({
                  type: 'success',
                  message: response.msg
                })
              }else{
                this.$message({
                  type: 'error',
                  message: response.msg
                })
                //this.closeForm()
              }
            }
          ).catch(error=>{
             console.log(error)
          })

      },
      //编辑提交
      editFly(row) {
        editFlyTemplateAction(row).then(
            response => {
              if(response && response.code === 20000){
                this.listFlyTemplate()
                this.closeForm()
                this.$message({
                  type: 'success',
                  message: response.msg
                })
              }else{
                this.$message({
                  type: 'error',
                  message: response.msg
                })
                //this.closeForm()
              }
            }
          ).catch(error=>{
             console.log(error)
          })


      },
      // 新增|编辑
      addOrEditFly() {
          if (this.formData.config_id > 0) {
              this.addFly(this.formData)
          } else {
              this.editFly(this.formData)
          }
       },

      // 编辑
      editFlyTemplate(row) {
         this.formTitle = '编辑样式'
         this.formData.config_id = row.config_id
         this.formData.config_name = row.config_name
         this.formData.left_img = row.left_img
         this.formData.dur = row.dur
         this.formData.back_img = row.back_img
         this.formData.pcw_back_img = row.pcw_back_img
         this.formData.hl_text_color = row.hl_text_color
         this.formData.text_color = row.text_color
         this.formData.dynamic_imgs = row.dynamic_imgs
         this.formData.pcw_dynamic_imgs = row.pcw_dynamic_imgs
         if (row.bgc_start) {
            this.formData.bgc = row.bgc_start + "-"+ row.bgc_end
         }
         this.showForm()
      },
     // 模拟
      testFlyTemplate(row) {
        let params = {
          config_name: row.config_name,
        }
        testFlyTemplateAction(params).then(
              response => {
                if(response && response.code === 20000){
                  this.$message({
                    type: 'success',
                    message: response.msg
                  })
                }else{
                  this.$message({
                    type: 'error',
                    message: response.msg
                  })
                }
              }
            ).catch(error=>{
               console.log(error)
            })
      },
     // 列表
      listFlyTemplate() {
        let params = {
          page: this.currentPage,
          pageSize: this.pageSize
        }

        listFlyTemplateAction(params).then(response => {
          if (response.code === 20000) {
            this.templateList = response.data.items
            this.totalCount = response.data.page_info.total
          }
        })
      },
    }

}
</script>
