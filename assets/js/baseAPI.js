// $.ajaxPrefilter() 可以在调用 $.get()  $.post() $.ajax() 之后，立即调用
$.ajaxPrefilter(function (options) {
    // 开发环境服务器地址
    let baseURL = 'http://api-breakingnews-web.itheima.net'
    // 测试环境服务器地址
    // let baseURL = 'http://api-breakingnews-web.itheima.net'
    // 开产环境服务器地址
    // let baseURL = 'http://api-breakingnews-web.itheima.net'

    // 手动添加根路径
    options.url = baseURL + options.url
    // 如果服务器路径包括 /my/ 则进行身份认证
    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }

        options.complete = function (res) {
            console.log(res.responseJSON);

            let obj = res.responseJSON
            if (obj.status == 1 && obj.message == "身份认证失败！") {
                // 销毁 token
                localStorage.removeItem('token')
                // 跳转到首页
                location.href = '/login.html'
            }
        }
    }
})