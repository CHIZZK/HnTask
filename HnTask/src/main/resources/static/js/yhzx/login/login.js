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
            url: '/com/edu/zut/login/UserLogin',
            data: user,
            dataType: 'JSON',
            async:false,
            success: function (r) {

            },
        })

    }
});

function getVerify() {
    $("#imgCode").on("click", function() {
         $("#imgVerify").attr("src", 'login/getVerify?' + Math.random());//jquery方式
    });
}