// $.ajaxPrefilter() 可以在调用 $.get()  $.post() $.ajax() 之后，立即调用
$.ajaxPrefilter(function (options) {
    // 开发环境服务器地址
    let baseURL = 'http://api-breakingnews-web.itheima.net'
    // 测试环境服务器地址
    // let baseURL = 'http://api-breakingnews-web.itheima.net'
    // 开产环境服务器地址
    // let baseURL = 'http://api-breakingnews-web.itheima.net'


    options.url = baseURL + options.url
})