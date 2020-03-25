<template>
    <div style="background-color:#eee;height:100%">
        <div ref="videoEcharts" style="height:400px;"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    mounted(){
        this.$axios({
            method:'get',
            url:'http://localhost:2138/getVideoCount'
        }).then(res=>{
            console.log(res.data)
            var videoCharts = this.$echarts.init(this.$refs.videoEcharts);
            var option = {
                title:{
                    text:'当日试看页点击量统计',
                    textAlign:'auto',
                    x:'center',
                    y:'top'
                    },
                tooltip:{show:true,trigger:'axis'},
                xAxis:{type:'category',data:res.data.eDate,boundaryGap: false,},
                yAxis:{
                    boundaryGap: [0, '50%'],
                    type: 'value'
                },
                series:[{
                    type:'line',
                    data:res.data.eData
                }]
            }
            videoCharts.setOption(option);
        });

        
    }
}
</script>