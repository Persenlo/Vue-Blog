import service from "..";


//获取身份
export function getRole(count,index){
    return service({
        method: "Get",
        url: "/role",
        params:{
            count: count,
            index: index,
        },
        withCredentials: true
    })
}

//通过ID获取身份
export function getRolebyId(id){
    return service({
        method: "Get",
        url: "/role",
        params:{
            roleId: id,
        },
        withCredentials: true
    })
}

//发布身份
export function postNotify(token,data){
    return service({
        method: "Post",
        url: "/role",
        headers:{
            'Authorization':token,
            'Content-Type':'application/json'
        },
        data: data,
        withCredentials: true
    })
}

//更新身份
export function updateNotify(token,data){
    return service({
        method: "PUT",
        url: "/role",
        headers:{
            'Content-Type':'application/json',
            'Authorization':token,
        },
        data: data,
        withCredentials: true
    })
}

//删除身份
export function deleteNotify(token,id){
    return service({
        method: "DELETE",
        url: "/role",
        headers:{
            'Authorization':token,
        },
        params:{
            roleId: id,
        },
        withCredentials: true
    })
}