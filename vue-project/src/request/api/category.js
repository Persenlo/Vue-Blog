import service from "..";


//获取分类
export function getCategory(){
    return service({
        method: "Get",
        url: "/category",
        withCredentials: true
    })
}

//发布分类
export function postCategory(token,data){
    return service({
        method: "Post",
        url: "/category",
        headers:{
            'Authorization':token,
            'Content-Type':'application/json'
        },
        data: data,
        withCredentials: true
    })
}

//更新分类
export function updateCategory(token,data){
    return service({
        method: "PUT",
        url: "/category",
        headers:{
            'Content-Type':'application/json',
            'Authorization':token,
        },
        data: data,
        withCredentials: true
    })
}

//删除分类
export function deleteCategory(token,cid){
    return service({
        method: "DELETE",
        url: "/category",
        headers:{
            'Authorization':token,
        },
        params:{
            id: cid,
        },
        withCredentials: true
    })
}