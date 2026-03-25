import { createCourseApi, getAllPurchaseCourseApi, getCourseApi, getSingleCourseApi, getPurchasedCourseApi } from '@/Api/course.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'


export const useCreateCourseHook=()=>{
    const queryClient = useQueryClient()
     return useMutation({
        mutationFn:createCourseApi,
        onSuccess:(data)=>{
            queryClient.invalidateQueries(['getCourse'])

        },

        onError:(err)=>{
            console.log(err)
        }
     })
}



export const useGetCourseHook = (search)=>{
    return useQuery({
        queryFn:()=>getCourseApi(search),
        queryKey:['getCourse', search]
    })
}


export const useGetSingleCourseHook = (id)=>{
    return useQuery({
        queryFn:()=>getSingleCourseApi(id),
        queryKey:['getSingleCourse',id]
    })
}


export const useGetPurchaseCourse=(courseId)=>{
    return useQuery({
        queryFn:()=>getPurchasedCourseApi(courseId),
        queryKey:['getPurchasedCourse',courseId]
    })
}


export const useGetAllPurchaseCourse=()=>{
    return useQuery({
        queryFn:getAllPurchaseCourseApi,
        queryKey:['getAllPurchasedCourse']
    })
}