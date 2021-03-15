$(function () {
    getUserinfo()
    // 退出登录
    let layer=layui.layer;
    $('#btnLongout').on('click',function(e){
        e.preventDefault()
        layer.confirm('是否确认退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token');
            location.href='/login.html';
            layer.close(index);
          });
    })
})
function getUserinfo() {
    $.ajax({
       url: '/my/userinfo',
       type: 'GET',
       /* headers:{
        Authorization:localStorage.getItem('token') || ''
       }, */
       success:(res) => {
          console.log(res);
          if(res.status !== 0){
              return layui.layer.msg(res.message);
          }
          renderAvatar(res.data);
       }
    })
}
// 渲染头像
function renderAvatar(user) {
    // 渲染名称
    let name =user.nickname|| user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name);
    // 渲染头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr("src",user.user_pic);
        $('.text_avatar').hide();
    }else{
        $('.layui-nav-img').hide();
        $('.text_avatar').show().html(name[0].toUpperCase());
    }
}