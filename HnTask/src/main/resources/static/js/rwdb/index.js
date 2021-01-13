layui.use(['element','carousel','laypage','layer','table','laydate'], function() {
    var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
    var carousel = layui.carousel;
    var laypage = layui.laypage;
    var layer = layui.layer;
    var $ = layui.jquery;
    var table = layui.table;
    var laydate = layui.laydate;
    var saveArr = [];
    var id;
    var tableIns;
    var djdw=true;
    //日期
    laydate.render({
        elem: '#startTime'
    });
    laydate.render({
        elem: '#endTime'
    });
    $(document).ready(function () {
        findUserName();
        findData();
    });
    $('#logout').click(function () {
        logout();
    });
    // 表格渲染
    function dataList(datas){
        tableIns = table.render({
            elem: '#dataTable'//表的id
            , toolbar: '#toolbar' //开启头部工具栏，并为其绑定左侧模板
            , title: '组织数据表'
            ,id: 'idTest'
            , cols: [[
                {field:'GID', title: 'ID', hide: true}
                ,{type: 'checkbox', fixed: 'left'}
                ,{title: '序号', fixed: 'left', unresize: true, align: 'center', type: 'numbers'}
                ,{field:'GZLB', title: '工作类别'}
                ,{field:'GZNR', title: '工作内容'}
                ,{field:'GZBZ', title: '工作标准'}
                ,{field:'KSSJ', title: '开始时间'}
                ,{field:'JSSJ', title: '结束时间'}
            ]],
            data: datas,
        });
    }

    function findData() {
        $.ajax({
            type: "post",
            url: '/com/edu/zut/zzgl/findData',
            data: {},
            dataType: 'JSON',
            async:false,
            success: function (r) {
                if(r.length==0){
                    djdw=false;
                }
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
                    location.href="/com/edu/zut/yhzx/yhzxlogin";
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
                location.href="/com/edu/zut/yhzx/yhzxlogin";
            },
        })
    }
});