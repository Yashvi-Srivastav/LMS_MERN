import { useQuery } from "@tanstack/react-query"
import { dailyDataApi, getDataApi } from '@/Api/Analytic.api'


export const useGetDataHook=()=>{
    return useQuery({
        queryFn:getDataApi,
        queryKey:['getDataApi']
    })
}


export const useGetDailyData=(startDate, endDate

)=>{
    return useQuery({
        queryFn:()=>dailyDataApi(startDate, endDate),
        queryKey:['dailyDataApi',startDate, endDate]
    })
}