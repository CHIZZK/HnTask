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
    $(document).ready(function () {
        findData();
    });

    // 表格渲染
    function dataList(datas){
        tableIns = table.render({
            elem: '#dataTable'//表的id
            , toolbar: '#toolbar' //开启头部工具栏，并为其绑定左侧模板
            , title: '角色数据表'
            ,id: 'idTest'
            , cols: [[
                {field:'GID', title: 'ID', hide: true}
                ,{field:'POSTID', title: 'ID', hide: true}
                ,{type: 'checkbox', fixed: 'left'}
                ,{title: '序号', fixed: 'left', unresize: true, align: 'center', type: 'numbers'}
                ,{field:'POSTNAME', title: '角色名称'}
                ,{field:'STOPFLAG', title: '角色状态'}
            ]],
            data: datas,
        });
    }
    table.on('toolbar(data)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'add':
                $('#jsbh').removeAttr('readonly','readonly');
                add();
                break;
            case 'update':
                $('#jsbh').attr('readonly','readonly');
                if(checkStatus.data.length==0){
                    layer.alert('未选择数据。');
                    return;
                }else if (checkStatus.data.length>1){
                    layer.alert('只能选择一条数据。');
                    return;
                }
                update(checkStatus.data);
                break;
            case 'stop':
                if(checkStatus.data.length==0){
                    layer.alert('未选择数据。');
                    return;
                }else if (checkStatus.data.length>1){
                    layer.alert('只能选择一条数据。');
                    return;
                }
                layer.confirm('是否停用该角色?', {icon: 3, title:'提示'}, function(index){
                    var gidArr=[];
                    for (var i=0;i<checkStatus.data.length;i++){
                        var data={
                            gid:checkStatus.data[i].GID,
                            stopflag:1
                        }
                        gidArr.push(data);
                    }
                    stopDate(gidArr);
                    layer.close(index);
                });
                break;
            case 'recover':
                if(checkStatus.data.length==0){
                    layer.alert('未选择数据。');
                    return;
                }else if (checkStatus.data.length>1){
                    layer.alert('只能选择一条数据。');
                    return;
                }
                layer.confirm('是否恢复该角色?', {icon: 3, title:'提示'}, function(index){
                    var gidArr=[];
                    for (var i=0;i<checkStatus.data.length;i++){
                        var data={
                            gid:checkStatus.data[i].GID,
                            stopflag:0
                        }
                        gidArr.push(data);
                    }
                    stopDate(gidArr);
                    layer.close(index);
                });
                break;
        };
    });
    function add(){
        $('#jsmc').val("");
        $('#jsbh').val("");
        layer.open({
            title: '新增角色',
            type:1,//类型
            anim:3,//弹出方式
            maxmin:true,
            closeBtn:1,
            shade:0.3,//遮罩层
            scrollbar: false,
            area:['350px','300px'],
            content: $('#addJsModel'),
            btn:['确定','关闭'],
            yes:function (index) {
                var datas = layui.table.cache.idTest;
                var jsmc = $('#jsmc').val();
                var jsbh = $('#jsbh').val();
                if (jsmc==null||jsmc==""){
                    layer.alert('角色名称不能为空。');
                    return;
                }
                if (jsbh==null||jsbh==""){
                    layer.alert('角色编号不能为空。');
                    return;
                }
                var zz=/^\+?[1-9][0-9]*$/;
                for (var i=0;i<datas.length;i++){
                    if(datas[i].POSTID==jsbh){
                        layer.alert('组织编号已存在。');
                        return;
                    }
                    if(!zz.test(jsbh)){
                        layer.alert('角色编号只能为非零正整数。');
                        return;
                    }
                }
                var datas={
                    jsmc:jsmc,
                    jsbh:jsbh
                }
                saveData(datas,index);

            }
        })
    }
    function update(data){
        $('#jsbh').val(data[0].POSTID);
        $('#jsmc').val(data[0].POSTNAME);
        layer.open({
            title: '修改角色',
            type:1,//类型
            anim:3,//弹出方式
            maxmin:true,
            closeBtn:1,
            shade:0.3,//遮罩层
            scrollbar: false,
            area:['350px','300px'],
            content: $('#addJsModel'),
            btn:['确定','关闭'],
            yes:function (index) {
                var jsmc = $('#jsmc').val();
                if (jsmc==null||jsmc==""){
                    layer.alert('角色名称不能为空。');
                    return;
                }
                var datas={
                    jsmc:jsmc,
                    gid:data[0].GID
                }
                updateData(datas,index);

            }
        })
    }
    function saveData(datas,index) {
        $.ajax({
            type: "post",
            url: '/com/edu/zut/szjs/savaData',
            data: datas,
            dataType: 'JSON',
            async:false,
            success: function (r) {
                if (r.code == '500') {
                    layer.msg('保存失败', {
                        offset: '15px'
                        , icon: 2
                        , time: 1000
                    });
                } else {
                    layer.close(index);
                    findData();
                    layer.msg('保存成功', {
                        offset: '15px'
                        , icon: 0
                        , time: 1000
                    });
                }
            },
        })
    }
    function updateData(datas,index) {
        $.ajax({
            type: "post",
            url: '/com/edu/zut/szjs/updateData',
            data: datas,
            dataType: 'JSON',
            async:false,
            success: function (r) {
                if (r.code == '500') {
                    layer.msg('修改失败', {
                        offset: '15px'
                        , icon: 2
                        , time: 1000
                    });
                } else {
                    layer.close(index);
                    findData();
                    layer.msg('修改成功', {
                        offset: '15px'
                        , icon: 0
                        , time: 1000
                    });
                }
            },
        })
    }
    function stopDate(data) {
        $.ajax({
            type: "post",
            url: '/com/edu/zut/szjs/stopData',
            data: JSON.stringify(data),
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
            url: '/com/edu/zut/szjs/findData',
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
});