<template>
    <div>
        <el-radio-group v-model="flag">
            <el-radio-button :label="true">电影试看页</el-radio-button>
            <el-radio-button :label="false">游戏试看页</el-radio-button>
        </el-radio-group>
        <el-table
            v-show="flag"
            :height="clientHeight"
            ref="table"
            :data='tableData1.slice((currentPage1-1)*pageSize,currentPage1*pageSize)'
            stripe="" border="" highlight-current-row
            style="width:100%">
            <el-table-column prop='number' label="电影编号" width="180"></el-table-column>
            <el-table-column prop='name' label="电影名称" width="200"></el-table-column>
            <el-table-column prop='duration' label="电影时长" width="100"></el-table-column>
            <el-table-column prop='url' label="观看链接" ></el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="del(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-table
            v-show="!flag"
            :height="clientHeight"
            ref="table2"
            :data='tableData2.slice((currentPage2-1)*pageSize,currentPage2*pageSize)'
            stripe="" border="" highlight-current-row
            style="width:100%">
            <el-table-column prop='number' label="视频编号" width="180"></el-table-column>
            <el-table-column prop='name' label="视频名称" width="200"></el-table-column>
            <el-table-column prop='url' label="观看链接" ></el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="del(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            v-show="flag"
            background=""
            :total="tableData1.length"
            :current-page="currentPage1"
            :page-size="pageSize"
            @current-change="handleCurrentChange"
            >
        </el-pagination>

        <el-pagination
            v-show="!flag"
            background=""
            :total="tableData2.length"
            :current-page="currentPage2"
            :page-size="pageSize"           
            @current-change="handleCurrentChange2"
            >
        </el-pagination>

        <el-dialog 
            center=""
            title="提示"
            :visible="delVisible">
            <span>确定删除该条影片记录吗</span>
            <span slot="footer">
                <el-button type="danger" size="small" @click="handleDel">确定</el-button>
                <el-button size="small" @click="delVisible=false;">取消</el-button>
            </span>
        </el-dialog>
        
    </div>
</template>

<script>


export default {
   
    data(){
        return{
            tableData1:[],
            tableData2:[],
            delVisible:false,
            delIndex:null,
            currentPage1:1,
            currentPage2:1,
            pageSize:20,
            clientHeight:'',
            flag:true
        }
    },
    mounted(){
        this.$axios({
            method:'get',
            url:'http://localhost:2138/getallmovie'
        }).then(res=>{
            
            for(var item in res.data){
                let listItem = res.data[item];
                listItem.number = item;
                this.tableData1.push(listItem);
            }
            
        });

        this.$axios({
            method:'get',
            url:'http://localhost:2138/getallgame'
        }).then(res=>{
            
            for(var item in res.data){
                let listItem = res.data[item];
                listItem.number = item;
                this.tableData2.push(listItem);
            }
        });


        
        
    },
    methods:{
        del(index){
            this.delIndex = index;
            this.delVisible = true;
        },
        handleDel(){
            if(this.flag){
                var movieNum = this.tableData1[this.delIndex].number;
                var url = 'https://weixin.zj186.com:2138/deleteMovie?number='+movieNum;
                
                this.$axios({
                    method:'get',
                    url
                }).then(res=>{
                    console.log(res.data);
                });
                this.tableData1.splice(this.delIndex,1);
                this.delVisible = false;
            }else{
                var gameNum = this.tableData2[this.delIndex].number;
                var url = 'https://weixin.zj186.com:2138/deleteGame?number='+gameNum;
                
                this.$axios({
                    method:'get',
                    url
                }).then(res=>{
                    console.log(res.data);
                });
                this.tableData2.splice(this.delIndex,1);
                this.delVisible = false;
            }
            
            

        },

        handleCurrentChange(val){
            this.currentPage1 = val;
        },
        handleCurrentChange2(val){
            this.currentPage2 = val;
        }
    },
    created(){
        this.clientHeight = document.documentElement.clientHeight-90-48-40;
        window.onresize=()=>{
            this.clientHeight = document.documentElement.clientHeight-90-48-40;
        }
    }
}
</script>