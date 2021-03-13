$(function () {
    // 给两个盒子的按钮绑定点击事件，点击登录时，显示登录盒子，隐藏注册盒子
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })


    // 自定义校验规则
    let form = layui.form;
    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            let pwd = $('.reg-box input[name=password]').val()
            if (value != pwd) {
                return '两次密码输入不一致！'
            }
        }
    })

    // 注册功能
    let layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val()
            },
            success: (res) => {
                if (res.status != 0) {
                    return layer.alert(res.message, { icon: 5 });
                }
                layer.alert('恭喜你，注册成功', { icon: 6 });
                // 跳转到登录页面
                $('#link_login').click()
                // 清空表单
                $('#form_reg')[0].reset()
            }
        })
    })


    // 登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);

                if (res.status != 0) {
                    return layer.alert(res.message, { icon: 5 });
                }
                // 保存 token
                localStorage.setItem('token', res.token)
                // 跳转
                location.href = '/index.html'
            }
        })
    })




















    // 入口函数结束
})