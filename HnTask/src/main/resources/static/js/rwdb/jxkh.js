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
            findData(value);
        }
    });
    $(document).ready(function () {
        var date = new Date()
        var month=date.getMonth()+1;
        if (month<10){
            month='0'+month;
        }
        findUserName();
        findData(date.getFullYear()+'-'+month);
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
                ,{field:'PF', title: '评分', align: 'center','edit': true}
            ]],
            data: datas,
        });
    }
    table.on('toolbar(data)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'save_btn':
                var data = layui.table.cache["idTest"];
                if (data.length == 0) {
                    layer.alert('没有数据变动，无需保存。');
                    return;
                } else {
                    var datas=[];
                    for (var i=0;i<data.length;i++){
                        if(data[i].SFTJ==0){
                            var pattern = /^[0-9]+(.[0-9]{2})?$/;
                            if (!pattern.test(data[i].PF)){
                                layer.alert('评分只能为数字且保留两位小数。');
                                return;
                            }
                            if (data[i].PF<0){
                                layer.alert('评分不能小于0。');
                                return;
                            }
                            if (data[i].PF>100){
                                layer.alert('评分不能大于100。');
                                return;
                            }
                            datas.push(data[i]);
                        }else{
                            // layer.alert('已提交的数据不能修改。');
                            // return;
                        }

                    }
                    saveData(datas);
                }
                break;
            case 'sumit_btn':
                    if (checkStatus.data.length == 0) {
                        layer.alert('未选择数据。');
                        return;
                    } else {
                        var khid=[];
                        for (var i=0;i<checkStatus.data.length;i++){
                            if(checkStatus.data[i].PF==undefined||
                                checkStatus.data[i].PF==null||checkStatus.data[i].PF===""){
                                layer.alert('评分不能为空。');
                                return;
                            }else{
                                if(checkStatus.data[i].KHGID==undefined||
                                    checkStatus.data[i].KHGID==null||checkStatus.data[i].KHGID===""){
                                    layer.alert('请先保存数据。');
                                    return;
                                }
                            }
                            khid.push(checkStatus.data[i].KHGID);
                        }
                        updateData(khid);
                    }
                break;
        };
    });

    function saveData(datas,index) {
        $.ajax({
            type: "post",
            url: '/com/edu/zut/jxkp/saveData',
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
                    findData($('#wcsx').val());
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
            url: '/com/edu/zut/jxkp/updateData',
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
                    layer.close(index);
                    findData($('#wcsx').val());
                    layer.msg('提交成功', {
                        offset: '15px'
                        , icon: 0
                        , time: 1000
                    });
                }
            },
        })
    }

    function findData(wcsx) {
        $.ajax({
            type: "post",
            url: '/com/edu/zut/jxkp/findData',
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