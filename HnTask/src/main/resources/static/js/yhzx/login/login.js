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
                    location.href="/com/edu/zut/yhzx/szyh";
                }
            },
        })

    }
});
