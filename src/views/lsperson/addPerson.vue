<template>
	<div class="app-container">
<el-form ref="ruleForm" :model="ruleForm" :rules="rules"  label-width="100px"  class="demo-ruleForm" >
  <el-form-item label="卡号/编号" prop="cardid">
    <el-input v-model="ruleForm.cardid"></el-input>
  </el-form-item>
  <el-form-item label="姓名" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="类型" prop="persontype">
    <el-select v-model="ruleForm.persontype" placeholder="请选择人员类型">
      <el-option label="警员" value="0"></el-option>
      <el-option label="在押人员" value="1"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="照片" prop="photo">
<el-upload
  class="avatar-uploader"
  action=""
  :show-file-list="false"
  :on-change="imageOnchange"
  :auto-upload="false"  v-model="ruleForm.photo">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
<input id="test" hidden="hidden" />
	</div>
	
</template>

<script>
	import  { compressImg_bak2 }  from "@/utils/compressImg"
	import  $ from  "jquery"
	import  {addLsPerson}  from "@/api/LsPerson"
	export default {
		
    data() {
      return {
		imageUrl:'',
        ruleForm: {
		  cardid:'',
          name: '',
          persontype: '',
          photo:''
        },
		rules: {
          cardid: [
            { required: true, message: '请输入卡号或者编号', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          persontype: [
            { required: true, message: '请选择人员类型', trigger: 'change' }
          ],
		  photo:[
			  {required:true,message:'请上传人脸图片'}
		  ]
          
        }
      }
    },
    methods: {
      onSubmit(formName) {
		  this.changePhotoValue();
		  this.$refs[formName].validate((valid) => {
          if (valid) {
			  const loading = this.$loading({
			    lock: true,
			    text: '数据提交中，正在进行人脸检测，请稍后...',
			    spinner: 'el-icon-loading',
			    background: 'rgba(0, 0, 0, 0.7)'
			  });
            addLsPerson(this.ruleForm).then( data => {
				loading.close();
				if(data.code === 0)
				this.$message({
                message: data.msg,
                type: 'success'
                });
				
			}).catch(data => {
				loading.close();
			})
			
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
	  resetForm(formName) {
        this.$refs[formName].resetFields();
		this.imageUrl ="";
      },
      imageOnchange(file) {
		  if(file){
			 compressImg_bak2(file.raw).then(function(res){
				 $('#test').val(res);
			 });
			  this.imageUrl = URL.createObjectURL(file.raw);
		  }
      },
	  changePhotoValue(){
		  this.ruleForm.photo = $('#test').val();
	  }
    }
  }
</script>

<style>
	.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
