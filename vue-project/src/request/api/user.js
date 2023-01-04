import service from "..";

// 验证码登录
export function login(loginData){
    return service({
        method: "Post",
        url: "/login",
        data: loginData,
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials: true,
    })
}

// 行为登录
export function actionlogin(loginData,captch){
    return service({
        method: "Post",
        url: "/login/action",
        data: loginData,
        params:{
            'captchaVerification': captch
        },
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials: true,
    })
}

// 注册
export function register(registerData){
    return service({
        method: "Post",
        url: "/login/register",
        data: registerData,
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials: true,
    })
}

// 获取验证码
export function getVerify(){
    return service({
        method: "Get",
        url: "/login/verify",
        responseType: 'blob',
        withCredentials: true,
    })
}

// 获取邮箱验证码
export function getMailVerify(datas){
    return service({
        method: "Post",
        url: "/login/mail",
        data: datas,
        withCredentials: true,
    })
}

// 忘记密码
export function resetPassword(datas){
    return service({
        method: "Post",
        url: "/login/forget",
        data: datas,
        withCredentials: true,
    })
}

//通过token获取用户信息
export function getUserInfo(token){
    return service({
        method: "Get",
        url: "/user/currentUser",
        headers:{
            'Authorization':token,
        },
        withCredentials: true,
    })
}

//获取图片
export function getImage(imageId,token){
    return service({
        method: "Get",
        url: "/img",
        headers:{
            'Authorization':token,
        },
        params:{
            imgId: imageId,
        },
        withCredentials: true
    })
}

// 更新用户信息
export function updateUser(token,datas){
    return service({
        method: "PUT",
        url: "/user",
        headers:{
            'Authorization':token,
        },
        data: datas,
        withCredentials: true,
    })
}

// 修改用户密码
export function modifyPwd(token,datas){
    return service({
        method: "Post",
        url: "/user/modifyPwd",
        headers:{
            'Authorization':token,
        },
        data: datas,
        withCredentials: true,
    })
}

// 登出
export function logout(token){
    return service({
        method: "Get",
        url: "/login/exit",
        headers:{
            'Authorization':token,
        },
        withCredentials: true
    })
}
