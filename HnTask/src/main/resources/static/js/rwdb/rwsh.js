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
    var roleType=0;
    var tableIns;
    //日期
    var now = new Date();
    laydate.render({
        elem: '#kssj'
        ,min:'now'
    });
    laydate.render({
        elem: '#jssj'
        ,min:'now'
    });
    $(document).ready(function () {
        findUserName();
        findUserRole();
        findData();
    });
    $('#choose').click(function () {
        chooseZrzt();
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
                ,{field:'CZZT', title: '状态', align: 'center'}
            ]],
            data: datas,
        });
    }
    // 审核用户表格渲染
    function ShrList(datas){
        shrtable.render({
            elem: '#shrTable'//表的id
            , title: '用户数据表'
            , cols: [[
                , {field:'YHDM', title: 'yhdm', hide: true}
                ,{type: 'checkbox', fixed: 'left'}
                ,{title: '序号', fixed: 'left', unresize: true, align: 'center', type: 'numbers'}
                ,{field:'YHMC', title: '登录名称', align: 'center',width:155}
                ,{field:'XSMC', title: '显示名称', align: 'center',width:160}
                ,{field:'DYBM', title: '对应部门', align: 'center',width:170}
            ]],
            data: datas,
        });
    }
    table.on('toolbar(data)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'rwxf':
                if (roleType!=0) {
                    if (checkStatus.data.length == 0) {
                        layer.alert('未选择数据。');
                        return;
                    } else {
                        var gid=[];
                        for (var i=0;i<checkStatus.data.length;i++){
                            gid.push(checkStatus.data[i].GID);
                        }
                        var datas={
                            gid:gid,
                            rwzt:2
                        };
                        updateData(datas);
                    }
                }
                break;
            case 'rwht':
                if (roleType!=0) {
                    if (checkStatus.data.length == 0) {
                        layer.alert('未选择数据。');
                        return;
                    } else {
                        var gid=[];
                        for (var i=0;i<checkStatus.data.length;i++){
                            gid.push(checkStatus.data[i].GID);
                        }
                        var datas={
                            gid:gid,
                            rwzt:3
                        };
                        updateData(datas);
                    }
                }
                break;
        };
    });

    function updateData(datas,rwzt,index) {
        $.ajax({
            type: "post",
            url: '/com/edu/zut/rwsh/updateData',
            data: JSON.stringify(datas),
            contentType:"application/json",
            dataType: 'JSON',
            async:false,
            success: function (r) {
                if (r.code == '500') {
                    layer.msg('操作失败', {
                        offset: '15px'
                        , icon: 2
                        , time: 1000
                    });
                } else {
                    layer.close(index);
                    findData();
                    layer.msg('操作成功', {
                        offset: '15px'
                        , icon: 0
                        , time: 1000
                    });
                }
            },
        })
    }

    function findData() {
        $.ajax({
            type: "post",
            url: '/com/edu/zut/rwsh/findData',
            data: {},
            dataType: 'JSON',
            async:false,
            success: function (r) {
                if (roleType!=0) {
                    dataList(r);
                }else{
                    dataList([]);
                }

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
    function findUserRole() {
        $.ajax({
            type: "post",
            url: '/com/edu/zut/rwsh/findUserRole',
            data: {},
            dataType: 'JSON',
            async:false,
            success: function (r) {
                roleType=r.data;
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