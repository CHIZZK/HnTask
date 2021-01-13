layui.use(['element','carousel','laypage','layer','table','laydate'], function() {
    var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
    var carousel = layui.carousel;
    var laypage = layui.laypage;
    var layer = layui.layer;
    var $ = layui.jquery;
    var table = layui.table;
    var laydate = layui.laydate;
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
                ,{field:'GZLB', title: '工作类别', align: 'center'}
                ,{field:'GZLX', title: '工作类型', align: 'center'}
                ,{field:'GZNR', title: '工作内容', align: 'center'}
                ,{field:'GZBZ', title: '工作标准', align: 'center'}
                ,{field:'KSSJ', title: '开始时间', align: 'center'}
                ,{field:'JSSJ', title: '结束时间', align: 'center'}
                ,{field:'WCQK', title: '是否完成', align: 'center'}
                ,{field:'WCQKSM', title: '完成情况说明', align: 'center'}
            ]],
            data: datas,
        });
    }
    table.on('toolbar(data)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'rwfk':
                    if (checkStatus.data.length == 0) {
                        layer.alert('未选择数据。');
                        return;
                    }else {
                        var fkgid=[];
                        for (var i = 0;i<checkStatus.data.length;i++){
                            if (checkStatus.data[i].SFWC==undefined||checkStatus.data[i].SFWC===''
                                ||checkStatus.data[i].SFWC==null){
                                layer.alert('是否完成为空。');
                                return;
                            }
                            if (checkStatus.data[i].WCQKSM==undefined||checkStatus.data[i].WCQKSM===''
                                ||checkStatus.data[i].WCQKSM==null){
                                layer.alert('完成情况说明为空。');
                                return;
                            }
                            fkgid.push(checkStatus.data[i].FKGID);
                        }
                        rwfk(fkgid);
                    }
                break;
        };
    });
    //监听行双击事件
    table.on('rowDouble(data)', function(obj){
        var data = obj.data;
        updateRwxx(data);
    });
    function updateRwxx(data){
        $('#gzlb').val(data.GZLB);
        $('#gzlx').val(data.GZLX);
        $('#gznr').val(data.GZNR);
        $('#gzbz').val(data.GZBZ);
        $('#kssj').val(data.KSSJ);
        $('#jssj').val(data.JSSJ);
        $('#wcqk').val(data.SFWC);
        $('#wcqksm').val(data.WCQKSM);
        layer.open({
            title: '任务完成情况说明',
            type:1,//类型
            anim:3,//弹出方式
            maxmin:true,
            closeBtn:1,
            shade:0.3,//遮罩层
            scrollbar: false,
            area:['900px','700px'],
            content: $('#updateRwxxModel'),
            btn:['确定','关闭'],
            yes:function (index) {
                var sfwc = $('#wcqk').val();
                var wcqksm = $('#wcqksm').val();
                if (sfwc==null||sfwc==""){
                    layer.alert('是否完成不能为空。');
                    return;
                }
                if (wcqksm==null||wcqksm==""){
                    layer.alert('完成情况说明不能为空。');
                    return;
                }else{
                    if (gznr.length>100){
                        layer.alert('完成情况说明不能超过100个字。');
                        return;
                    }
                }
                var datas={
                    gid:data.GID,
                    fkgid:data.FKGID,
                    sfwc:sfwc,
                    wcqksm:wcqksm
                }
                updateData(datas,index);
            }
        })
    }
    function rwfk(datas) {
        $.ajax({
            type: "post",
            url: '/com/edu/zut/rwfk/rwfk',
            data: JSON.stringify(datas),
            contentType:"application/json",
            dataType: 'JSON',
            async:false,
            success: function (r) {
                if (r.code == '500') {
                    layer.msg('反馈失败', {
                        offset: '15px'
                        , icon: 2
                        , time: 1000
                    });
                } else {
                    findData();
                    layer.msg('反馈成功', {
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
            url: '/com/edu/zut/rwfk/updateData',
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
    function findData() {
        $.ajax({
            type: "post",
            url: '/com/edu/zut/rwfk/findData',
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
                location.href="/com/edu/zut/rwdb/rwdblogin";
            },
        })
    }
});