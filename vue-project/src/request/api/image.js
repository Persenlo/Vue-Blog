import service from "..";


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

//上传图片
export function uploadImage(formdata,token){
    return service({
        method: "Post",
        url: "/img",
        headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization':token,
        },
        data: formdata,
        withCredentials: true
    })
}

//删除图片
export function deleteImage(imageId,token){
    return service({
        method: "DELETE",
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
