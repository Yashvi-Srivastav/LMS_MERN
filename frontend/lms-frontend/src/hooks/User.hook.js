import{ useMutation, useQuery } from "@tanstack/react-query"
import { getUser, loginApi, logoutApi, registerApi } from "../Api/user.api"
import { data } from "react-router-dom"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from '@tanstack/react-query'



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
        queryKey:['getUser'],
        retry: false,              // ✅ don't retry on 401
    staleTime: 0,              // ✅ always fetch fresh
    cacheTime: 0,  
    })
}

export const useLoggedOut = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: (data) => {
      toast.success(data?.message)
      queryClient.removeQueries(['user'])        // ✅ remove user query
      queryClient.clear()                        // ✅ clear all cache
      navigate('/login', { replace: true })                       // ✅ redirect to login
    },
    onError: (err) => {
      console.log(err)
    }
  })
}

