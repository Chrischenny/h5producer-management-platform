<template >
    <div style='height:100%;background-color:#eee;'>
        <el-row style='height:100%;'>
            <el-col :span='16' :offset='4' style="background-color:#fff;height:100%;padding:4%;" status-icon="true">
                <h1 style="text-align:center;font-size:34px;">电影试看页制作</h1>
                <el-form :model='movie' ref='form'  size="samll" label-position='left' :rules='rules'>


                    <el-row :gutter='15'>
                        <el-col :span='12'>
                            <el-form-item label='影片名称' label-width="80px" prop="name">
                                <el-input v-model="movie.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='12'>
                            <el-form-item label='导演' label-width="80px" prop="director">
                                <el-input v-model="movie.director"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                   
                    
                    <el-row :gutter='15'>
                        <el-col :span='12'>
                            <el-form-item label='发片国家' label-width="80px" prop="country">
                                <el-input v-model="movie.country"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='12'>
                            <el-form-item label='上映时间' label-width="80px" prop="showDate">
                                <el-input v-model="movie.showDate"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>


                    <el-row :gutter='15'>
                        <el-col :span='12'>
                            <el-form-item label='语言' label-width="80px" prop="language">
                                <el-input v-model="movie.language"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='12'>
                            <el-form-item label='时长' label-width="80px" prop="duration">
                                <el-input v-model="movie.duration"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    
                    <el-form-item label='编剧' label-width="80px" prop="writer">
                        <el-input v-model="movie.writer"></el-input>
                    </el-form-item>
                    <el-form-item label='演员' label-width="80px" prop="actor">
                        <el-input v-model="movie.actor"></el-input>
                    </el-form-item>
                    <el-form-item label='观影链接' label-width="80px" prop="url">
                        <el-input v-model="movie.url"></el-input>
                    </el-form-item>
                    <el-form-item label='电影简介' label-width="80px" prop="summary">
                        <el-input v-model="movie.summary" type='textarea'></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>

                </el-form>

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
                    上传海报：
                    <el-upload
                        ref="posteruploader"
                        action="http://localhost:2138/movieupload"
                        list-type="picture"
                        :auto-upload="false"
                        :on-change='posterHandleChange'
                        :on-remove='posterHandleRemove'
                        :limit='1'>
                        <el-button size="small" type="primary">选择图片</el-button>
                    </el-upload>
                    <div slot="footer">
                        <el-button size="small" type="success" @click="imgupload">上传到服务器</el-button>
                    </div>
                </el-dialog>
                
                <el-dialog title="提示" :visible.sync='successvisible'>
                    
                    创建成功链接为：https://weixin.zj186.com/web/videoplot/index.html#/{{timestamp}}
                    <div slot="footer">
                        <el-button size="small" type="success" @click="successvisible=false">确定</el-button>
                    </div>
                </el-dialog>
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
            movie:{
                name:'',
                director:'',
                writer:'',
                actor:'',
                type:'',
                country:'',
                showDate:'',
                language:'',
                duration:'',
                url:'',
                summary:''
            },
            rules:{
                name:[{required:true,message:'请输入影片名称',trigger:'blur'}],
                director:[{required:true,message:'请填写导演名字',trigger:'blur'}],
                writer:[{required:true,message:'请填写编剧名字',trigger:'blur'}],
                actor:[{required:true,message:'请填写演员名字',trigger:'blur'}],
                type:[{required:true,message:'请填影片类型',trigger:'blur'}],
                country:[{required:true,message:'请填写出版国家',trigger:'blur'}],
                showDate:[{required:true,message:'请填写上映日期',trigger:'blur'}],
                language:[{required:true,message:'请填写语言类型',trigger:'blur'}],
                duration:[{required:true,message:'请填写影片时长',trigger:'blur'}],
                url:[{validator:checkUrl,trigger:'blur'}],
                summary:[{required:true,message:'请填写电影简介',trigger:'blur'}]
            }
        }
    },
    methods:{
        resetForm(){
            this.$refs.form.resetFields();
        },
        submitForm(){
             
            var moviejson = JSON.stringify(this.movie);
            
            
            if(typeof( this.fd.get('movie')) == 'string'){//防止多次往formdata推入数据
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
                        this.fd.append('movie',moviejson);
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
                url:'http://localhost:2138/movieupload',
                data:this.fd,
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }).then(res=>{
                
                this.fd.delete('bgimg');
                this.fd.delete('movie');
                this.fd.delete('posterimg');
                this.$refs.form.resetFields();
                this.$refs.posteruploader.clearFiles();
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
        posterHandleChange(file){
            var img = new Image();
            var posteruploader = this.$refs.posteruploader;
            img.onload =()=>{
                var width = img.width;
                var height = img.height;
                if(width == 150&& height==210){
                    this.fd.append('posterimg',file.raw);
                }
                else{
                    alert('图片尺寸错误！')
                    posteruploader.clearFiles();
                }
            }
            img.src = file.url;
        },
        posterHandleRemove(file){
            this.fd.delete('posterimg');
            console.log(this.fd.get('posterimg'))
        }
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