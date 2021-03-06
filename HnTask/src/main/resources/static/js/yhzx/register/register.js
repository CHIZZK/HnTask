layui.use(['form', 'layedit', 'laydate'], function(){
    var form = layui.form;
    var $ = layui.jquery;

    $('#registerBtn').click(function() {
        registerBtn();
    });
    $('body').keydown(function() {
        if(event.keyCode == "13"){
            $('#registerBtn').click();
        }
    });

    function registerBtn() {
        var username=$('#username').val();
        var password=$('#password').val();
        var password2=$('#password2').val();
        if(password!=password2){
            layer.msg('密码不一致', {
                icon: 5,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            }, function(){
                //do something
            });
            return;
        }
        var user={
            username:username,
            password:password
        };

        $.ajax({
            type: "post",
            url: '/com/edu/zut/login/Userregister',
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
                    location.href="/com/edu/zut/yhzx/szyh";
                }
            },
        })

    }
});
