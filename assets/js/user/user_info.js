$(function () {
    // 定义验证规则
    let form = layui.form;
    form.verify({
        nickname: function (value) { //value：表单的值、item：表单的DOM对象
            if (value.length > 6) {
                return '昵称长度不能超过6个字';
            }
        }
    })
    // 用户渲染
    initUserInfo();
    let layer=layui.layer;
    function initUserInfo(){
        $.ajax({
           url: '/my/userinfo',
           method: 'GET',
           success:(res) => {
            //   console.log(res);
            if(res.status !== 0){
                return layer.msg(res.message);
            }
            // 成功后渲染
            form.val('formUserInfo',res.data)
           }
        })
    }
    // 重置按钮
    $('form').on('reset',function (e) {
        e.preventDefault();
        // 重新渲染
        initUserInfo();
    })
    /* $('#btnReset').on('click',function (e) {
        e.preventDefault()
        initUserInfo();
    }) */
    // 提交
    $('form').on('submit',function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data:$(this).serialize(),
            success:(res) => {
            //    console.log(res);
            if(res.status!==0){
                return layer.msg(res.message);
            }
            layer.msg('恭喜您修改成功')
            window.parent.getUserinfo();
            }
         });
    })
})