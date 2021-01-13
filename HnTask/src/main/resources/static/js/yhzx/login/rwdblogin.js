layui.use(['form', 'layedit', 'laydate'], function(){
    var form = layui.form;
    var $ = layui.jquery;

    $('#loginBtn').click(function() {
        login();
    });
    $('body').keydown(function() {
        if(event.keyCode == "13"){
            $('#loginBtn').click();
        }
    });
    $("#upPwd").on("click", function() {
        updatePwd();
    });

    $("#imgVerify").on("click", function() {
        $("#imgVerify").attr("src", '/com/edu/zut/login/getVerify?' + Math.random());//jquery方式
    });

    function login() {
        var username=$('#username').val();
        var password=$('#password').val();
        var checkcode =$('#LAY-user-login-vercode').val();
        var user={
            username:username,
            password:password,
            checkcode:checkcode
        };

        $.ajax({
            type: "post",
            url: '/com/edu/zut/login/UserLogin',
            data: user,
            dataType: 'JSON',
            async:false,
            success: function (r) {
                if (r.code==500){
                    layer.msg(r.msg, {
                        icon: 5,
                        time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    }, function(){
                        //do something
                    });
                }else{
                    location.href="/com/edu/zut/rwdb/index";
                }
            },
        })

    }
    function updatePwd() {
        layer.open({
            title: '修改密码',
            type:1,//类型
            anim:3,//弹出方式
            maxmin:true,
            closeBtn:1,
            shade:0.3,//遮罩层
            scrollbar: false,
            area:['400px','400px'],
            content: $('#upPwdModel'),
            btn:['确定','关闭'],
            yes:function (index) {
                var username = $('#username2').val();
                var oldpassword = $('#oldpassword').val();
                var newpassword = $('#newpassword').val();
                var newpassword2 = $('#newpassword2').val();
                if(newpassword!=newpassword2){
                    layer.msg('新密码不一致', {
                        icon: 5,
                        time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    });
                    return;
                }
                var data={
                    username:username,
                    oldpassword:oldpassword,
                    newpassword:newpassword
                };
                $.ajax({
                    type: "post",
                    url: '/com/edu/zut/login/updatePwd',
                    data: data,
                    dataType: 'JSON',
                    async:false,
                    success: function (r) {
                        if (r.code == '500') {
                            layer.msg(r.msg, {
                                offset: '15px'
                                , icon: 2
                                , time: 1000
                            });
                        } else {
                            layer.close(index)
                            layer.msg(r.msg, {
                                offset: '15px'
                                , icon: 0
                                , time: 1000
                            });
                        }
                    },
                })

            }
        })

    }
});
