$(function () {
    let form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.trim().length <= 1 || value.trim().length > 6) {
                return '昵称长度为 2~6 位之间：'
            }
        }
    })

    // 用户渲染
    initUserInfo()

    let layer = layui.layer
    // 封装函数
    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // 成功 渲染用户信息
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置
    $('#btnReset').on('click', function (e) {
        // 阻止浏览器默认行为
        e.preventDefault()
        // 渲染页面
        initUserInfo()
    })

    // 提交修改
    $('.layui-form').on('submit', function (e) {
        // 阻止默认提交事件
        e.preventDefault()
        // 提交用户信息
        $.ajax({
            type: 'post',
            url: '/my/userinfo            ',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你，修改成功！')
                window.parent.getUserInfo()
            }
        })
    })


})