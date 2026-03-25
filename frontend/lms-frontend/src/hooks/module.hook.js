import { createModuleApi, getModuleApi, getCommentApi } from "@/Api/module.api"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useCreateModule=()=>{
    return useMutation({
            mutationFn:createModuleApi,
            onSuccess:(data)=>{
                console.log(data)
            },
            onError:(err)=>{
                console.log(err)
            }
        })
    
}


export const useGetModule = ()=>{
    return useQuery({
        queryFn:()=>getModuleApi(id),
        queryKey:['getModule']
    })
}


export const useGetComment = (id)=>{
    return useQuery({
        queryFn:()=>getCommentApi(id),
        queryKey:['getComment',id],
       
    })
}