// $.ajaxPrefilter()在使用$.git $.ajsx等后立即使用
$(function () {
    let baseURL = "http://ajax.frontend.itheima.net"
    $.ajaxPrefilter(function (params) {
        // 路径前缀
        params.url = baseURL + params.url;
        // 身份验证
        if (params.url.indexOf("/my/") !== -1) {
            params.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }
        params.complete = function (res) {
            let obj = res.responseJSON;
            if (obj.status == 1 && obj.message == '身份认证失败！') {
                localStorage.removeItem('token');
                location.href = '/login.html';
            }
        }
    })
})