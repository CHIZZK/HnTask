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

    function login() {
        var username=$('#username').val();
        var password=$('#password').val();
        var checkcode =$('#LAY-user-login-vercode').val();
        var user={
            uname:username,
            pwd:password,
            code:checkcode
        };

        $.ajax({
            type: "post",
            url: 'toLogin',
            data: user,
            dataType: 'JSON',
            async:false,
            success: function (r) {
                $.ajax({
                    type: "post",
                    url: 'getRealAddressAndIP',
                    data:{},
                    dataType: 'JSON',
                    success: function (r) {

                    },
                })
                if (r.identity !="" && r.identity !=null) {
                    if (r.identity =="0"){
                        location.href = 'manager';
                        return false;
                    }else{
                        location.href = 'index';
                        return false;
                    }

                } else {
                    //登入成功的提示与跳转
                    layer.msg('登入失败', {
                        offset: '15px'
                        , icon: 2
                        , time: 1000
                    }, function () {
                    });
                }
            },
        })
        //张赞兵

    }
});

function getVerify() {
    // $("#imgCode").on("click", function() {
    $("#imgVerify").attr("src", 'login/getVerify?' + Math.random());//jquery方式
    // });
}