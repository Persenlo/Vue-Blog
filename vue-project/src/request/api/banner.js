import service from "..";


//获取轮播图
export function getBanner(){
    return service({
        method: "Get",
        url: "/banner",
        withCredentials: true
    })
}

//通过ID获取轮播图
export function getBannerById(id){
    return service({
        method: "Get",
        url: "/banner",
        params:{
            bannerId: id,
        },
        withCredentials: true
    })
}

//发布轮播图
export function BannerBanner(token,data){
    return service({
        method: "Banner",
        url: "/banner",
        headers:{
            'Authorization':token,
            'Content-Type':'application/json'
        },
        data: data,
        withCredentials: true
    })
}

//更新轮播图
export function updateBanner(token,data){
    return service({
        method: "PUT",
        url: "/banner",
        headers:{
            'Content-Type':'application/json',
            'Authorization':token,
        },
        data: data,
        withCredentials: true
    })
}

//删除轮播图
export function deleteBanner(token,id){
    return service({
        method: "DELETE",
        url: "/banner",
        headers:{
            'Authorization':token,
        },
        params:{
            bannerId: id,
        },
        withCredentials: true
    })
}