layui.use(['tree','element','carousel','laypage','layer','table','laydate'], function() {
    var tree = layui.tree;
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
        findUserName();
        findData();
        findGldw();
    });
    $('#gldw').change(function () {
        var compid = $('#gldw').val();
        findDybm(compid);
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
                ,{field:'YHMC', title: '登录名称'}
                ,{field:'XSMC', title: '显示名称'}
                ,{field:'USERTYPE', title: '所属类别'}
                ,{field:'STOPFLAG', title: '状态'}
                ,{field:'GLDW', title: '管理单位'}
                ,{field:'DYBM', title: '对应部门'}
            ]],
            data: datas,
        });
    }
    table.on('toolbar(data)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'add':
                addUser();
                break;
            case 'stop':
                if(checkStatus.data.length==0){
                    layer.alert('未选择数据。');
                    return;
                }else if (checkStatus.data.length>1){
                    layer.alert('只能选择一条数据。');
                    return;
                }
                layer.confirm('是否停用该用户?', {icon: 3, title:'提示'}, function(index){
                    var gidArr=[];
                    for (var i=0;i<checkStatus.data.length;i++){
                        var data={
                            gid:checkStatus.data[i].GID,
                            stoped:1
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
                layer.confirm('是否恢复该用户?', {icon: 3, title:'提示'}, function(index){
                    var gidArr=[];
                    for (var i=0;i<checkStatus.data.length;i++){
                        var data={
                            gid:checkStatus.data[i].GID,
                            stoped:0
                        }
                        gidArr.push(data);
                    }
                    stopDate(gidArr);
                    layer.close(index);
                });
                break;
            case 'update':
                if(checkStatus.data.length==0){
                    layer.alert('未选择数据。');
                    return;
                }else if (checkStatus.data.length>1){
                    layer.alert('只能选择一条数据。');
                    return;
                }else{
                    if (checkStatus.data[0].XSMC=="系统管理员"){
                        layer.alert('系统管理员不能修改。');
                        return;
                    }
                    update(checkStatus.data);
                }
                break;
            case 'reset':
                if(checkStatus.data.length==0){
                    layer.alert('未选择数据。');
                    return;
                }else{
                    layer.confirm('是否重置?', {icon: 3, title:'提示'}, function(index){
                        resetPwd(checkStatus.data);
                        layer.close(index);
                    });
                }
                break;
            case 'setrole':
                if(checkStatus.data.length==0){
                    layer.alert('未选择数据。');
                    return;
                }else if (checkStatus.data.length>1){
                    layer.alert('只能选择一条数据。');
                    return;
                }else{
                    if (checkStatus.data[0].XSMC=="系统管理员"){
                        layer.alert('系统管理员不能设置角色。');
                        return;
                    }
                    setrole(checkStatus.data);
                }
                break;
        };
    });
    function setrole(data){
        var yhjs = findYhjs(data[0].YHDM);
        tree.render({
            elem: '#roleTree'
            ,data: yhjs
            ,showCheckbox: true
            ,id: 'tree'
        });
        layer.open({
            title: '设置用户角色权限',
            type:1,//类型
            anim:3,//弹出方式
            maxmin:true,
            closeBtn:1,
            shade:0.3,//遮罩层
            scrollbar: false,
            area:['500px','400px'],
            content: $('#setRoleModel'),
            btn:['确定','关闭'],
            yes:function (index) {
                var checkedData = tree.getChecked('tree');
                for (var i=0;i<checkedData.length;i++){
                    var vo = {
                        data:checkedData,
                        yhdm:data[0].YHDM
                    }
                }
                savePost(vo,index);
            }
        })
    }
    function addUser(){
        $('#yhmc').removeAttr('disabled','disabled');
        $('#yhmc').val("");
        $('#xsmc').val("");
        $('#email').val("");
        $('#tel').val("");
        $('#gldw').val("");
        $('#dybm').val("");
        layer.open({
            title: '新增用户',
            type:1,//类型
            anim:3,//弹出方式
            maxmin:true,
            closeBtn:1,
            shade:0.3,//遮罩层
            scrollbar: false,
            area:['600px','400px'],
            content: $('#addUserModel'),
            btn:['确定','关闭'],
            yes:function (index) {
                var datas = layui.table.cache.idTest;
                var yhmc = $('#yhmc').val();
                var xsmc = $('#xsmc').val();
                var email = $('#email').val();
                var tel = $('#tel').val();
                var gldw = $('#gldw').val();
                var dybm = $('#dybm').val();
                if (yhmc==null||yhmc==""){
                    layer.alert('登录名称不能为空。');
                    return;
                }
                var  re = /^[0-9a-zA-Z]*$/;
                if (!re.test(yhmc)){
                    layer.alert('登录名称只能为字母和数字。');
                    return;
                }

                if (xsmc==null||xsmc==""){
                    layer.alert('显示名称不能为空。');
                    return;
                }
                if (email==null||email==""){
                    layer.alert('email不能为空。');
                    return;
                }
                var myreg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
                if(!myreg.test(email)){
                    layer.alert("请输入正确邮箱地址");
                    return;
                }
                if (tel==null||tel==""){
                    layer.alert('手机号不能为空。');
                    return;
                }
                var telreg = /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/;
                if(!telreg.test(tel)){
                    layer.alert("请输入正确手机号");
                    return;
                }
                if (gldw==null||gldw==""){
                    layer.alert('管理单位不能为空。');
                    return;
                }
                if (dybm==null||dybm==""){
                    layer.alert('对应部门不能为空。');
                    return;
                }
                for (var i=0;i<datas.length;i++){
                    if(datas[i].YHMC==yhmc){
                        layer.alert('用户名称已存在。');
                        return;
                    }
                }
                var datas={
                    yhmc:yhmc,
                    xsmc:xsmc,
                    email:email,
                    tel:tel,
                    gldw:gldw,
                    dybm:dybm
                }
                saveData(datas,index);
            }
        })
    }
    function update(data){
        findDybm(data[0].DWDM);
        $('#yhmc').attr('disabled','disabled');
        $('#yhmc').val(data[0].YHMC);
        $('#xsmc').val(data[0].XSMC);
        $('#email').val(data[0].EMAIL);
        $('#tel').val(data[0].MOVETEL);
        $('#gldw').val(data[0].DWDM);
        $('#dybm').val(data[0].BMDM);

        layer.open({
            title: '修改用户信息',
            type:1,//类型
            anim:3,//弹出方式
            maxmin:true,
            closeBtn:1,
            shade:0.3,//遮罩层
            scrollbar: false,
            area:['700px','500px'],
            content: $('#addUserModel'),
            btn:['确定','关闭'],
            yes:function (index) {
                var datas = layui.table.cache.idTest;
                var yhmc = $('#yhmc').val();
                var xsmc = $('#xsmc').val();
                var email = $('#email').val();
                var tel = $('#tel').val();
                var gldw = $('#gldw').val();
                var dybm = $('#dybm').val();

                if (xsmc==null||xsmc==""){
                    layer.alert('显示名称不能为空。');
                    return;
                }
                if (email==null||email==""){
                    layer.alert('email不能为空。');
                    return;
                }
                var myreg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
                if(!myreg.test(email)){
                    layer.alert("请输入正确邮箱地址");
                    return;
                }
                if (tel==null||tel==""){
                    layer.alert('手机号不能为空。');
                    return;
                }
                var telreg = /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/;
                if(!telreg.test(tel)){
                    layer.alert("请输入正确手机号");
                    return;
                }
                if (gldw==null||gldw==""){
                    layer.alert('管理单位不能为空。');
                    return;
                }
                if (dybm==null||dybm==""){
                    layer.alert('对应部门不能为空。');
                    return;
                }
                var datas={
                    gid:data[0].GID,
                    yhdm:data[0].YHDM,
                    yhmc:yhmc,
                    xsmc:xsmc,
                    email:email,
                    tel:tel,
                    gldw:gldw,
                    dybm:dybm
                }
                updateData(datas,index);

            }
        })
    }
    function saveData(datas,index) {
        $.ajax({
            type: "post",
            url: '/com/edu/zut/szyh/savaData',
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
            url: '/com/edu/zut/szyh/updateData',
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
    function resetPwd(datas) {
        $.ajax({
            type: "post",
            url: '/com/edu/zut/szyh/resetPwd',
            data: JSON.stringify(datas),
            contentType:"application/json",
            dataType: 'JSON',
            async:false,
            success: function (r) {
                if (r.code == '500') {
                    layer.msg('重置失败', {
                        offset: '15px'
                        , icon: 2
                        , time: 1000
                    });
                } else {
                    layer.msg('重置成功', {
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
            url: '/com/edu/zut/szyh/stopData',
            contentType:"application/json",
            data: JSON.stringify(data),
            dataType: 'JSON',
            async:false,
            success: function (r) {
                if (r.code == '500') {
                    layer.msg('停用失败', {
                        offset: '15px'
                        , icon: 2
                        , time: 1000
                    });
                } else {
                    findData();
                    layer.msg('已停用', {
                        offset: '15px'
                        , icon: 0
                        , time: 1000
                    });
                }
            },
        })
    }
    function savePost(data,index) {
        $.ajax({
            type: "post",
            url: '/com/edu/zut/szyh/savePost',
            contentType:"application/json",
            data: JSON.stringify(data),
            dataType: 'JSON',
            async:false,
            success: function (r) {
                if (r.code == '500') {
                    layer.msg('设置失败', {
                        offset: '15px'
                        , icon: 2
                        , time: 1000
                    });
                } else {
                    layer.close(index)
                    layer.msg('设置成功', {
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
            url: '/com/edu/zut/szyh/findData',
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
    function findGldw() {
        $.ajax({
            type: "post",
            url: '/com/edu/zut/szyh/findGldw',
            data: {},
            dataType: 'JSON',
            async:false,
            success: function (r) {
                var re = "<option value=''></option>";
                for (var i=0;i<r.length;i++){
                    re+="<option value="+r[i].COMPID+">"+r[i].SCOMPNAME+"</option>";
                }
                $('#gldw').append(re);
            },
        })
    }
    function findDybm(compid) {
        $.ajax({
            type: "post",
            url: '/com/edu/zut/szyh/findDybm',
            data: {compid:compid},
            dataType: 'JSON',
            async:false,
            success: function (r) {
                $("#dybm").empty();
                var re = "<option value=''></option>";
                for (var i=0;i<r.length;i++){
                    re+="<option value="+r[i].COMPID+">"+r[i].SCOMPNAME+"</option>";
                }
                $('#dybm').append(re);
            },
        })
    }
    function findYhjs(yhdm) {
        var datas=[];
        $.ajax({
            type: "post",
            url: '/com/edu/zut/szyh/findYhjs',
            data: {yhdm:yhdm},
            dataType: 'JSON',
            async:false,
            success: function (r) {
                $.each(r,function (index,value) {
                    var flag=false;
                    if(value.CHECKED==1){
                        flag=true;
                    }
                    var data={
                        title:value.TITLE,
                        id:value.ID,
                        checked:flag
                    }
                    datas.push(data);
                })
            },
        })
        return datas;
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