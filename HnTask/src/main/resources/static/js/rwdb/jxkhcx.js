layui.use(['tree','element','carousel','laypage','layer','table','laydate'], function() {
    var tree = layui.tree;
    var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
    var carousel = layui.carousel;
    var laypage = layui.laypage;
    var layer = layui.layer;
    var $ = layui.jquery;
    var table = layui.table;
    var shrtable = layui.table;
    var laydate = layui.laydate;
    var tableIns;
    //日期
    laydate.render({
        elem: '#wcsx',
        format : 'yyyy-MM',
        type : 'month',
        value: new Date(),
        done:function(value,date){
            findJxcxData(value);
        }
    });
    $(document).ready(function () {
        var date = new Date()
        var month=date.getMonth()+1;
        if (month<10){
            month='0'+month;
        }
        findUserName();
        findJxcxData(date.getFullYear()+'-'+month);
    });
    $('#logout').click(function () {
        logout();
    });

    // 表格渲染
    function dataList(datas){
        tableIns = table.render({
            elem: '#dataTable'//表的id
            , toolbar: '#toolbar' //开启头部工具栏，并为其绑定左侧模板
            , title: '用户数据表'
            ,id: 'idTest'
            , cols: [[
                {field:'GID', title: 'ID', hide: true}
                ,{type: 'checkbox', fixed: 'left'}
                ,{title: '序号', fixed: 'left', unresize: true, align: 'center', type: 'numbers'}
                ,{field:'GZLB', title: '工作类别', align: 'center'}
                ,{field:'GZLX', title: '工作类型', align: 'center'}
                ,{field:'GZNR', title: '工作内容', align: 'center'}
                ,{field:'GZBZ', title: '工作标准', align: 'center'}
                ,{field:'ZRZT', title: '责任主体', align: 'center'}
                ,{field:'KSSJ', title: '开始时间', align: 'center'}
                ,{field:'JSSJ', title: '结束时间', align: 'center'}
                ,{field:'WCQK', title: '是否完成', align: 'center'}
                ,{field:'WCQKSM', title: '完成情况说明', align: 'center'}
                ,{field:'PF', title: '评分', align: 'center'}
            ]],
            data: datas,
        });
    }
    function findJxcxData(wcsx) {
        $.ajax({
            type: "post",
            url: '/com/edu/zut/jxkp/findJxcxData',
            data: {wcsx:wcsx},
            dataType: 'JSON',
            async:false,
            success: function (r) {
                dataList(r);

            },
        })
    }
    function findUserName() {
        $.ajax({
            type: "post",
            url: '/com/edu/zut/login/getUserName',
            data: {},
            dataType: 'JSON',
            async:false,
            success: function (r) {
                if (r.code==0){
                    $('#username').text(r.data);
                }else{
                    location.href="/com/edu/zut/rwdb/rwdblogin";
                }
            },
        })
    }
    function logout() {
        $.ajax({
            type: "post",
            url: '/com/edu/zut/login/logout',
            data: {},
            dataType: 'JSON',
            async:false,
            success: function (r) {
                location.href="/com/edu/zut/rwdb/rwdblogin";
            },
        })
    }
});