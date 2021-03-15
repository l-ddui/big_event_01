$(function () {
    // ajax获取用户信息 渲染到页面
    // 该功能后面也要用，必须设置为全局
    getUserInfo()

    // 退出
    $('#btnLogout').on('click', function () {
        //弹窗
        layer.confirm('确认退出？', { icon: 3, title: '提示' }, function (index) {
            // 销毁 token
            localStorage.removeItem('token')
            // 跳转路径
            location.href = '/login.html'
            // 关闭弹窗
            layer.close(index);
        });



    })

    // 入口函数结束
})


// 全局函数，从服务器获取用户信息
function getUserInfo() {
    // 发送ajax
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        // 封装到 $.ajaxPrefilter 中
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: (res) => {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            } else {
                renderAvatar(res.data);
            }
        }
    })
}

// 渲染用户信息
function renderAvatar(user) {
    // 如果有 nickname 渲染，否则渲染 username
    let name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 渲染头像 
    // 1 有头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        // 2 没有头像
        $('.layui-nav-img').hide()
        let text = name[0].toUpperCase()
        $('.text-avatar').show().html(text)
    }
}