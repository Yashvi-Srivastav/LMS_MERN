import{ useMutation, useQuery } from "@tanstack/react-query"
import { getUser, loginApi, logoutApi, registerApi } from "../Api/user.api"
import { data } from "react-router-dom"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"



export const useRegisterHook = ()=>{
    const navigate = useNavigate()
    return useMutation({
        mutationFn:registerApi,
        onSuccess:(data)=>{
            console.log(data)
            toast.success(data.message)
            navigate("/")
        },

        onError:(err)=>{
            console.log(err)
        }
    })
}


export const useLoginHook = ()=>{
    const navigate = useNavigate()
    return useMutation({
        mutationFn:loginApi,
        onSuccess:(data)=>{
            toast.success(data.message)
            navigate("/")
        },

        onError:(err)=>{
            console.log(err)
        }
    })
}


export const useGetUserHook = ()=>{
    return useQuery({
        queryFn:getUser,
        queryKey:['getUser']
    })
}

export const useLoggedOut=()=>{
    return useMutation({
        mutationFn:logoutApi,
        onSuccess:(data)=>{
            toast.success(data?.message)
            console.log(data)
        },
        onError:(err)=>{
            console.log(err)
        }
    })
}


