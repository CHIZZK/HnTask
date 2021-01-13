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
            case 'add':
                if (roleType!=0){
                    addRw();
                }
                break;
            case 'update':
                if (roleType!=0) {
                    if (checkStatus.data.length == 0) {
                        layer.alert('未选择数据。');
                        return;
                    } else if (checkStatus.data.length > 1) {
                        layer.alert('只能选择一条数据。');
                        return;
                    } else {
                        if (checkStatus.data[0].ZT == 1 || checkStatus.data[0].ZT == 2) {
                            layer.alert('待审核和审核通过状态的任务不可修改。');
                            return;
                        }
                        update(checkStatus.data);
                    }
                }
                break;
            case 'sumit':
                if (roleType!=0) {
                    if (checkStatus.data.length == 0) {
                        layer.alert('未选择数据。');
                        return;
                    } else {
                        if (checkStatus.data[0].ZT == 1 || checkStatus.data[0].ZT == 2) {
                            layer.alert('待审核和审核通过状态的任务不可重复提交。');
                            return;
                        }
                        shyhdm(checkStatus.data);
                    }
                }
                break;
        };
    });

    function addRw(){
        $('#gzlb').val("");
        $('#gzlx').val("");
        $('#gznr').val("");
        $('#gzbz').val("");
        $('#zrzt').val("");
        $('#kssj').val("");
        $('#jssj').val("");
        layer.open({
            title: '新增任务',
            type:1,//类型
            anim:3,//弹出方式
            maxmin:true,
            closeBtn:1,
            shade:0.3,//遮罩层
            scrollbar: false,
            area:['600px','580px'],
            content: $('#addRwModel'),
            btn:['确定','关闭'],
            yes:function (index) {
                var gzlb = $('#gzlb').val();
                var gzlx = $('#gzlx').val();
                var gznr = $('#gznr').val();
                var gzbz = $('#gzbz').val();
                var zrzt = $('#yhdm').val();
                var kssj = $('#kssj').val();
                var jssj = $('#jssj').val();
                if (gzlb==null||gzlb==""){
                    layer.alert('工作类别不能为空。');
                    return;
                }
                if (gzlx==null||gzlx==""){
                    layer.alert('工作类型不能为空。');
                    return;
                }
                if (gznr==null||gznr==""){
                    layer.alert('工作内容不能为空。');
                    return;
                }else{
                    if (gznr.length>50){
                        layer.alert('工作内容不能超过50个字。');
                        return;
                    }
                }
                if (gzbz==null||gzbz==""){
                    layer.alert('工资标准不能为空。');
                    return;
                }else{
                    if (gznr.length>40){
                        layer.alert('工资标准不能超过40个字。');
                        return;
                    }
                }
                if (zrzt==null||zrzt==""){
                    layer.alert('责任主体不能为空。');
                    return;
                }
                if (kssj==null||kssj==""){
                    layer.alert('开始时间不能为空。');
                    return;
                }
                if (jssj==null||jssj==""){
                    layer.alert('结束时间不能为空。');
                    return;
                }
                if (jssj<kssj){
                    layer.alert('结束时间不能小于开始时间。');
                    return;
                }
                var datas={
                    gzlb:gzlb,
                    gzlx:gzlx,
                    gznr:gznr,
                    gzbz:gzbz,
                    zrzt:zrzt,
                    kssj:kssj,
                    jssj:jssj
                }
                saveData(datas,index);
            }
        })
    }
    function update(data){
        var gid=data[0].GID;
        findZrzt(gid);
        $('#gzlb').val(data[0].RWLY);
        $('#gzlx').val(data[0].RWLX);
        $('#gznr').val(data[0].GZNR);
        $('#gzbz').val(data[0].GZBZ);
        $('#zrzt').val(data[0].ZRZT);
        $('#kssj').val(data[0].KSSJ);
        $('#jssj').val(data[0].JSSJ);
        $('#yhdm').val(data[0].YHDM);
        layer.open({
            title: '修改任务',
            type:1,//类型
            anim:3,//弹出方式
            maxmin:true,
            closeBtn:1,
            shade:0.3,//遮罩层
            scrollbar: false,
            area:['600px','580px'],
            content: $('#addRwModel'),
            btn:['确定','关闭'],
            yes:function (index) {
                var gzlb = $('#gzlb').val();
                var gzlx = $('#gzlx').val();
                var gznr = $('#gznr').val();
                var gzbz = $('#gzbz').val();
                var zrzt = $('#yhdm').val();
                var kssj = $('#kssj').val();
                var jssj = $('#jssj').val();
                if (gzlb==null||gzlb==""){
                    layer.alert('工作类别不能为空。');
                    return;
                }
                if (gzlx==null||gzlx==""){
                    layer.alert('工作类型不能为空。');
                    return;
                }
                if (gznr==null||gznr==""){
                    layer.alert('工作内容不能为空。');
                    return;
                }else{
                    if (gznr.length>50){
                        layer.alert('工作内容不能超过50个字。');
                        return;
                    }
                }
                if (gzbz==null||gzbz==""){
                    layer.alert('工资标准不能为空。');
                    return;
                }else{
                    if (gznr.length>40){
                        layer.alert('工资标准不能超过40个字。');
                        return;
                    }
                }
                if (zrzt==null||zrzt==""){
                    layer.alert('责任主体不能为空。');
                    return;
                }
                if (kssj==null||kssj==""){
                    layer.alert('开始时间不能为空。');
                    return;
                }
                if (jssj==null||jssj==""){
                    layer.alert('结束时间不能为空。');
                    return;
                }
                if (jssj<kssj){
                    layer.alert('结束时间不能小于开始时间。');
                    return;
                }
                var datas={
                    gid:gid,
                    gzlb:gzlb,
                    gzlx:gzlx,
                    gznr:gznr,
                    gzbz:gzbz,
                    zrzt:zrzt,
                    kssj:kssj,
                    jssj:jssj
                }
                updateData(datas,index);
            }
        })
    }
    function shyhdm(data){
        var gid=[];
        for (var i=0; i<data.length;i++){
            gid.push(data[i].GID);
        }
        if (roleType==2){
            //单位领导提交给公司领导（不单位隔离）
            var yhlist = findShyh();
            ShrList(yhlist);
        }else {
            //公司领导、部门主任直接下发任务
            layer.confirm('是否提交?', {icon: 3, title:'提示'}, function(index){
                sumitRw({gid:gid});
                layer.close(index);
            });
            return;
        }
        layer.open({
            title: '选择审核用户',
            type:1,//类型
            anim:3,//弹出方式
            maxmin:true,
            closeBtn:1,
            shade:0.3,//遮罩层
            scrollbar: false,
            area:['600px','580px'],
            content: $('#setShrModel'),
            btn:['确定','关闭'],
            yes:function (index) {
                var checkStatus = shrtable.checkStatus('shrTable').data;
                if (checkStatus==undefined||checkStatus==null||checkStatus==""){
                    layer.alert('未选择审核人。');
                    return;
                }else if (checkStatus.length==0){
                    layer.alert('未选择审核人。');
                    return;
                }else if (checkStatus.length>1){
                    layer.alert('只能选择一位用户。');
                    return;
                }

                var datas={
                    gid:gid,
                    shr:checkStatus[0].YHDM
                }
                sumitRw(datas);
                layer.close(index);
            }
        })
    }
    function saveData(datas,index) {
        $.ajax({
            type: "post",
            url: '/com/edu/zut/rwbx/savaData',
            data: JSON.stringify(datas),
            contentType:"application/json",
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
    function findShyh() {
        var data=null;
        $.ajax({
            type: "post",
            url: '/com/edu/zut/rwbx/findShyh',
            data: {},
            dataType: 'JSON',
            async:false,
            success: function (r) {
                data=r;
            },
        })
        return data;
    }
    function updateData(datas,index) {
        $.ajax({
            type: "post",
            url: '/com/edu/zut/rwbx/updateData',
            data: JSON.stringify(datas),
            contentType:"application/json",
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
    function sumitRw(datas) {
        $.ajax({
            type: "post",
            url: '/com/edu/zut/rwbx/sumitRw',
            data: JSON.stringify(datas),
            contentType:"application/json",
            dataType: 'JSON',
            async:false,
            success: function (r) {
                if (r.code == '500') {
                    layer.msg('提交失败', {
                        offset: '15px'
                        , icon: 2
                        , time: 1000
                    });
                } else {
                    findData();
                    layer.msg('提交成功', {
                        offset: '15px'
                        , icon: 0
                        , time: 1000
                    });
                }
            },
        })
    }
    function chooseZrzt() {
        var gzlb = $('#gzlb').val();
        if (gzlb==""){
            layer.msg('未选择工作类别！', {
                offset: '15px'
                , icon: 0
                , time: 1000
            });
            return;
        }
        var data = findZrzt(gzlb);
        tree.render({
            elem: '#zrztTree'
            ,data: data
            ,showCheckbox: true
            ,id: 'zrzttree'
        });
        var selectedYhdm = $('#yhdm').val();
        var Arr = selectedYhdm.split(',');
        tree.setChecked('zrzttree', Arr);
        layer.open({
            title: '选择责任主体',
            type:1,//类型
            anim:3,//弹出方式
            maxmin:true,
            closeBtn:1,
            shade:0.3,//遮罩层
            scrollbar: false,
            area:['500px','400px'],
            content: $('#setZrztModel'),
            btn:['确定','关闭'],
            yes:function (index) {
                var checkedData = [];
                if (tree.getChecked('zrzttree')!=undefined){
                    checkedData = tree.getChecked('zrzttree');
                }
                var yhmc=[];
                var yhdm=[];
                for (var i=0;i<checkedData.length;i++){
                    yhmc.push(checkedData[i].title);
                    yhdm.push(checkedData[i].id);

                }
                $('#zrzt').val(yhmc.join());
                $('#yhdm').val(yhdm.join());
                layer.close(index);
            }
        })
    }
    function findData() {
        $.ajax({
            type: "post",
            url: '/com/edu/zut/rwbx/findData',
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
    function findZrzt(gzlb) {
        var datas=[];
        $.ajax({
            type: "post",
            url: '/com/edu/zut/rwbx/findZrzt',
            data: {gzlb:gzlb},
            dataType: 'JSON',
            async:false,
            success: function (r) {
                $.each(r,function (index,value) {
                    var data={
                        title:value.XSMC,
                        id:value.YHDM
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
                    location.href="/com/edu/zut/rwdb/rwdblogin";
                }
            },
        })
    }
    function findUserRole() {
        $.ajax({
            type: "post",
            url: '/com/edu/zut/rwbx/findUserRole',
            data: {},
            dataType: 'JSON',
            async:false,
            success: function (r) {
                if (r.code==0){
                    var re = "";
                    if (r.data==1){
                        //公司领导
                        re='<option value=""></option>'+
                            '<option value="0">公司工作</option>';
                    }else if(r.data==2){
                        //单位领导
                        re='<option value=""></option>'+
                        '<option value="0">公司工作</option>'+
                        '<option value="1">部门工作</option>';
                    }else if(r.data==3){
                        //部门主任
                        re='<option value=""></option>'+
                        '<option value="2">个人工作</option>';
                    }else{
                        //一般员工
                        re='<option value=""></option>';
                    }
                    $('#gzlb').append(re);
                }
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