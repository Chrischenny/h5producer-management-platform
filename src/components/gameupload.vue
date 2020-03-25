<template>
    <div style='height:100%;background-color:#eee;'>
        <el-row style='height:100%;'>
            <el-col :offset="4" :span='16' style="background-color:#fff;height:100%;padding:4%;" status-icon="true">
                <h1 style="text-align:center;font-size:34px;">游戏试看页制作</h1>
                <el-form label-position="left" label-width="80px" size="small" :rules="rules" :model="game" ref='form'>

                    <el-row :gutter='15'>
                        <el-col :span='12'>
                            <el-form-item label='视频名称'  prop="name">
                                <el-input v-model="game.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='12'>
                            <el-form-item label='平台'  prop="platform">
                                <el-input v-model="game.platform"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item label="片源地址" prop='url'>
                        <el-input v-model='game.url'></el-input>
                    </el-form-item>
                    <el-form-item label="简介" prop="summary">
                        <el-input v-model="game.summary" type='textarea'></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">提交</el-button>
                        <el-button @click="resetForm()">重置</el-button>
                    </el-form-item>

                    <el-dialog
                        title="图片上传"
                        :visible.sync="dialogvisible"
                        center
                        >
                        上传背景墙：
                        <el-upload
                            ref="bguploader"
                            action="http://localhost:2138/movieupload"
                            list-type="picture"
                            :auto-upload="false"
                            :on-change='bgHandleChange'
                            :on-remove='bgHandleRemove'
                            :limit='1'
                            >   
                            <el-button size="small" type="primary">选择图片</el-button>    
                        </el-upload>
                        <div slot="footer">
                            <el-button size="small" type="success" @click="imgupload">上传到服务器</el-button>
                        </div>
                    </el-dialog>
                    <el-dialog title="提示" :visible.sync='successvisible'> 
                        创建成功链接为：https://weixin.zj186.com/web/gameplot/index.html#/{{timestamp}}
                        <div slot="footer">
                            <el-button size="small" type="success" @click="successvisible=false">确定</el-button>
                        </div>
                    </el-dialog>

                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
     data(){
        var checkUrl =(rule,value,callback)=>{
            let ex1 = /^https:\/\//;
            let ex2 = /^http:\/\//;
            if(!value){
                return callback(new Error('链接不能为空'));
            }else if(!value.match(ex1)&&!value.match(ex2)){
                return callback(new Error('请输入正确格式的地址'));
            }else{
                return callback();
            }
        }


        return{
            timestamp:'',
            fd:null,
            dialogvisible:false,
            successvisible:false,
            game:{
                name:'',
                platform:'',
                url:'',
                summary:''
            },
            rules:{
                name:[{required:true,message:'请输入短片名称',trigger:'blur'}],
                platform:[{required:true,message:'请输入平台名称',trigger:'blur'}],
                url:[{validator:checkUrl,trigger:'blur'}],
                summary:[{required:true,message:'请填写简介',trigger:'blur'}]
            }
        }
    },
    methods:{
        resetForm(){
            this.$refs.form.resetFields();
        },
        submitForm(){
            var gamejson = JSON.stringify(this.game);
            
            
            if(typeof( this.fd.get('game')) == 'string'){//防止多次往formdata推入数据
                console.log('ok!')
                this.$refs.form.validate((valid)=>{
                    if(valid){
                        this.dialogvisible = true;
                    }else{
                        return false;
                    }
                });
            }else{               
                this.$refs.form.validate((valid)=>{
                    if(valid){
                        this.fd.append('game',gamejson);
                        this.dialogvisible = true;
                    }else{
                        return false;
                    }
                });
            }
        },
        imgupload(){
            this.dialogvisible = false;
            this.$axios({
                method:'post',
                url:'http://localhost:2138/gameupload',
                data:this.fd,
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }).then(res=>{
                
                this.fd.delete('bgimg');
                this.fd.delete('game');
                this.$refs.form.resetFields();
                this.$refs.bguploader.clearFiles();
                this.successvisible = true;
                this.timestamp = res.data;
            })
            
        },
        bgHandleChange(file){
            var img = new Image();
            var bguploader = this.$refs.bguploader;
            img.onload =()=>{
                var width = img.width;
                var height = img.height;
                if(width == 640&& height==340){
                    this.fd.append('bgimg',file.raw);
                }
                else{
                    alert('图片尺寸错误！')
                    bguploader.clearFiles();
                }
            }
            img.src = file.url;
            
        },
        bgHandleRemove(file){
            this.fd.delete('bgimg');
        },
    },
    mounted(){
        this.fd = new FormData();
        console.log(sessionStorage.user);
        if(!sessionStorage.user){
            this.$router.push('/');
        }
    }
}
</script>