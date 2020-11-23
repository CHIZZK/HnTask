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
            , title: '组织数据表'
            ,id: 'idTest'
            , cols: [[
                 {field:'GID', title: 'ID', hide: true}
                ,{type: 'checkbox', fixed: 'left'}
                ,{title: '序号', fixed: 'left', unresize: true, align: 'center', type: 'numbers'}
                ,{field:'COMPID', title: '组织编号'}
                ,{field:'COMPNAME', title: '组织名称'}
                ,{field:'SCOMPNAME', title: '组织简称'}
                ,{field:'STOPFLAG', title: '组织状态'}
                ,{field:'ORGANFLAG', title: '组织标志', hide: true}
                ,{field:'PCOMPID', title: '上级单位ID', hide: true}
                ,{field:'SJDW', title: '上级单位', hide: true}
                ,{field:'DCDW', title: '底层单位', hide: true}
            ]],
            data: datas,
        });
    }
    table.on('toolbar(data)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'addtj':
                if(!djdw){
                    addZz(checkStatus.data,dcdw,true);
                    return;
                }
                if(checkStatus.data.length==0){
                    layer.alert('未选择数据。');
                    return;
                }else if (checkStatus.data.length>1){
                    layer.alert('只能选择一条数据。');
                    return;
                }else if (checkStatus.data[0].COMPID=='9999'){
                    layer.alert('顶层单位不能新增同级。');
                    return;
                }else{
                    addZz(checkStatus.data,djdw,true);
                }
                break;
            case 'addxj':
                if(checkStatus.data.length==0){
                    layer.alert('未选择数据。');
                    return;
                }else if (checkStatus.data.length>1){
                    layer.alert('只能选择一条数据。');
                    return;
                }else if (checkStatus.data[0].COMPID!='9999'
                    && checkStatus.data[0].DCDW!=0){
                    layer.alert('只有顶层单位和底层单位能新增下级。');
                    return;
                }else if (checkStatus.data[0].COMPID=='9999'
                    || checkStatus.data[0].DCDW==0){
                    addZz(checkStatus.data,djdw,false);
                    return;
                }
                break;
            case 'stop':
                layer.confirm('是否停用该组织?', {icon: 3, title:'提示'}, function(index){
                    var gidArr=[];
                    for (var i=0;i<checkStatus.data.length;i++){
                        gidArr.push(checkStatus.data[i].GID);
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
                    update(checkStatus.data);
                }
                break;
        };
    });
    function addZz(data,djdw,type){
        $('#sjzz').val("");
        $('#zzbz').val("");
        $('#zzmc').val("");
        $('#zzbh').val("");
        $('#zzjc').val("");
        $("#dcdw").attr("checked",false);
        $('#zzbh').attr('readonly',false);
        var sjzz=null;
        if (data.length>0){
            if(type){
                $('#sjzz').val(data[0].SJDW);
                sjzz=data[0].PCOMPID;
                if (data[0].DCDW==0){//不是底层单位
                    $('#zzbz').val("单位");
                }else{
                    $('#zzbz').val("部门");
                }
            }else{
                $('#sjzz').val(data[0].SCOMPNAME);
                sjzz=data[0].COMPID;
                if (data[0].DCDW==1){//不是底层单位
                    $('#zzbz').val("单位");
                }else{
                    $('#zzbz').val("部门");
                }
            }

        }else{
            if(!djdw){
                $('#zzbh').val(9999);
                $('#zzbh').attr('readonly',true);
            }
            $('#zzbz').val("单位");
        }
        layer.open({
            title: '新增组织单元',
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
                var zzbh = $('#zzbh').val();
                var zzmc = $('#zzmc').val();
                var zzjc = $('#zzjc').val();
                var zzbz= $('#zzbz').val();
                if (zzmc==null||zzmc==""){
                    layer.alert('组织名称不能为空。');
                    return;
                }
                if (zzjc==null||zzjc==""){
                    layer.alert('组织简称不能为空。');
                    return;
                }
                if (zzbh==null||zzbh==""){
                    layer.alert('组织编号不能为空。');
                    return;
                }
                var zz=/^\+?[1-9][0-9]*$/;
                for (var i=0;i<datas.length;i++){
                    if(datas[i].COMPID==zzbh){
                        layer.alert('组织编号已存在。');
                        return;
                    }
                    if(!zz.test(zzbh)){
                        layer.alert('组织编号只能为非零正整数。');
                        return;
                    }
                }

                if (zzbz=='单位'){
                    zzbz=0;
                }else{
                    zzbz=1;
                }
                var dcdw=0;
                if($("#dcdw").is(":checked")){
                    dcdw=0;
                }else{
                    dcdw=1;
                }
                var datas={
                    sjzz:sjzz,
                    zzmc:zzmc,
                    zzbh:zzbh,
                    zzjc:zzjc,
                    zzbz:zzbz,
                    dcdw:dcdw
                }
                saveData(datas,index);

            }
        })
    }
    function update(data){
        $('#zzbh').val(data[0].COMPID);
        $('#zzmc').val(data[0].COMPNAME);
        $('#zzjc').val(data[0].SCOMPNAME);
        $('#sjzz').val(data[0].SJDW);
        if(data[0].ORGANFLAG==0){
            $('#zzbz').val('单位');
        }else{
            $('#zzbz').val('组织');
        }
        if(data[0].DCDW==0){
            $("#dcdw").attr("checked","checked");
        }else{
            $("#dcdw").attr("checked",false);
        }

        layer.open({
            title: '修改组织单元',
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
                var zzbh = $('#zzbh').val();
                var zzmc = $('#zzmc').val();
                var zzjc = $('#zzjc').val();
                if (zzmc==null||zzmc==""){
                    layer.alert('组织名称不能为空。');
                    return;
                }
                if (zzjc==null||zzjc==""){
                    layer.alert('组织简称不能为空。');
                    return;
                }
                if (data[0].COMPID!=zzbh){
                    for (var i=0;i<datas.length;i++){
                        if(datas[i].COMPID==zzbh){
                            layer.alert('组织编号已存在。');
                            return;
                        }
                    }
                }
                var dcdw=0;
                if($("#dcdw").is(":checked")){
                    dcdw=0;
                }else{
                    dcdw=1;
                }
                var datas={
                    gid:data[0].GID,
                    zzmc:zzmc,
                    zzbh:zzbh,
                    zzjc:zzjc,
                    dcdw:dcdw
                }
                updateData(datas,index);

            }
        })
    }
    function saveData(datas,index) {
        $.ajax({
            type: "post",
            url: '/com/edu/zut/zzgl/savaData',
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
            url: '/com/edu/zut/zzgl/updateData',
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
            url: '/com/edu/zut/zzgl/stopData',
            data: JSON.stringify(data),
            contentType:"application/json",
            dataType: 'json',
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
});