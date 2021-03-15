$(function () {
    let form = layui.form
    form.verify({
        // 密码
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 新密码
        samePwd: function (value) {
            if (value == $('[name="oldPwd"]').val()) {
                return '原密码和新密码不能相同！'
            }
        },
        // 确认新密码
        rePwd: function (value) {
            if (value !== $('[name="newPwd"]').val()) {
                return '两次密码不一致，请重新输入！'
            }
        }




    })

    // 修改密码
    $('.layui-form').on('submit', function (e) {
        // 阻止默认提交
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg("密码修改成功！")
                // 清空表单
                $('.layui-form')[0].reset()
            }
        })




    })










})