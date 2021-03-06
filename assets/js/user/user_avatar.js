$(window).on('load', function () {
    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)







    // 上传头像
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })

    // 选择头像
    let layer = layui.layer
    $('#file').on('change', function (e) {
        // 拿到用户选择的文件
        let file = e.target.files[0]
        // 非空校验
        if (file == undefined) {
            return layer.msg('请选择需要上传的头像')
        }
        // 根据选择的文件，创建一个对应的 URL 地址：
        let newImgURL = URL.createObjectURL(file)
        // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)
    })

    // 上传头像
    $('#btnUpload').on('click', function () {
        // 获取 base64 类型的头像
        let dataURL = $image
            // 创建一个 Canvas 画布
            .cropper('getCroppedCanvas', {
                width: 100,
                height: 100
            })
            // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            .toDataURL('image/png')

        // 发送ajax
        $.ajax({
            type: 'post',
            url: '/my/update/avatar',
            data: { avatar: dataURL },
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('头像更换成功！')
                // 渲染头像
                window.parent.getUserInfo()
            }
        })
    })




})