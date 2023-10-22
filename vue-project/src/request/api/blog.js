import service from "..";


//获取文章
export function getPost(count,index){
    return service({
        method: "Get",
        url: "/post",
        params:{
            count: count,
            index: index,
        },
        withCredentials: true
    })
}

//通过ID获取文章
export function getPostById(id){
    return service({
        method: "Get",
        url: "/post",
        params:{
            postId: id,
        },
        withCredentials: true
    })
}

//通过分类获取文章
export function getPostByCategory(count,index,cid){
    return service({
        method: "Get",
        url: "/post",
        params:{
            count: count,
            index: index,
            category: cid,
        },
        withCredentials: true
    })
}

//发布文章
export function postPost(token,data){
    return service({
        method: "Post",
        url: "/post",
        headers:{
            'Authorization':token,
            'Content-Type':'application/json'
        },
        data: data,
        withCredentials: true
    })
}

//更新文章
export function updatePost(token,data){
    return service({
        method: "PUT",
        url: "/post",
        headers:{
            'Content-Type':'application/json',
            'Authorization':token,
        },
        data: data,
        withCredentials: true
    })
}

//删除文章
export function deletePost(token,pid){
    return service({
        method: "DELETE",
        url: "/post",
        headers:{
            'Authorization':token,
        },
        params:{
            id: pid,
        },
        withCredentials: true
    })
}