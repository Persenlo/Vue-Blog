import service from "..";


//获取公告
export function getNotify(count,index){
    return service({
        method: "Get",
        url: "/notify",
        params:{
            count: count,
            index: index,
        },
        withCredentials: true
    })
}

//通过ID获取公告
export function getNotifyById(id){
    return service({
        method: "Get",
        url: "/notify",
        params:{
            notifyId: id,
        },
        withCredentials: true
    })
}

//发布公告
export function postNotify(token,data){
    return service({
        method: "Post",
        url: "/notify",
        headers:{
            'Authorization':token,
            'Content-Type':'application/json'
        },
        data: data,
        withCredentials: true
    })
}

//更新公告
export function updateNotify(token,data){
    return service({
        method: "PUT",
        url: "/notify",
        headers:{
            'Content-Type':'application/json',
            'Authorization':token,
        },
        data: data,
        withCredentials: true
    })
}

//删除公告
export function deleteNotify(token,id){
    return service({
        method: "DELETE",
        url: "/notify",
        headers:{
            'Authorization':token,
        },
        params:{
            notifyId: id,
        },
        withCredentials: true
    })
}