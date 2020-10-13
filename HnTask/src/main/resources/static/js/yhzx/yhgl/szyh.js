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
    $(document).ready(function () {
        var datas=[{"id":10000,"yhmc":"sal","xsmc":"孙奥林","sslb":"普通",
            "zt":"已审批","gldw":"管理单位","dybm":"对应部门"}];
        dataList(datas);
    });

    // 表格渲染
    function dataList(datas){

        tableIns = table.render({
            elem: '#dataTable'//表的id
            , toolbar: '#toolbar' //开启头部工具栏，并为其绑定左侧模板
            , title: '字典数据表'
            , cols: [[
                 {field:'id', title: 'ID', hide: true}
                ,{type: 'checkbox', fixed: 'left'}
                ,{title: '序号', fixed: 'left', unresize: true, align: 'center', type: 'numbers'}
                ,{field:'yhmc', title: '登录名称'}
                ,{field:'xsmc', title: '显示名称'}
                ,{field:'sslb', title: '所属类别'}
                ,{field:'email', title: 'E-mail'}
                ,{field:'tel', title: '手机号'}
                ,{field:'sfzh', title: '身份证号'}
                ,{field:'sex', title: '性别'}
                ,{field:'zt', title: '状态'}
                ,{field:'gldw', title: '管理单位'}
                ,{field:'dybm', title: '对应部门'}
            ]],
            page: true,
            data: datas,
            limit: datas.length//显示的数量
        });
    }
    table.on('toolbar(data)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'add':
                addUser();
                break;
            case 'save':
                layer.msg(checkStatus.data);
                break;
            case 'delect':
                //获取选中行数量，可作为是否有选中行的条件
                if(checkStatus.data.length!=0){
                    layer.confirm('确定删除选中的数据？', {icon: 3, title: '提示信息'}, function (index) {
                        $.ajax({
                            type:"post",
                            url:'deleteDictDataRows',
                            contentType: 'application/json;',
                            dataType: "json",
                            data:JSON.stringify(checkStatus.data),
                            success:function (r) {
                                if(r.msg=='操作成功'){
                                    findData(id);
                                    layer.msg('删除成功！', {
                                        icon: 1,
                                        time: 900 //2秒关闭（如果不配置，默认是3秒）
                                    });
                                }
                            },
                            error:function (r) {
                                layer.close(index);
                                layer.msg('删除失败。');
                            },
                        })
                    });
                }else{
                    layer.msg('请选择要删除的信息');
                }
                break;
            case 'put':
            //获取选中行数量，可作为是否有选中行的条件

            //自定义头工具栏右侧图标 - 提示
            case 'LAYTABLE_TIPS':
                layer.alert('这是工具栏右侧自定义的一个图标按钮');
                break;
        };
    });
    function addUser(){
        layer.open({
            title: '新增用户',
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

                saveDictData(index);
            }
        })
    }
});