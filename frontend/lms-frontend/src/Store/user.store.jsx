import { create } from 'zustand'
import { devtools } from 'zustand/middleware'



export const useUserStore=create(
    devtools(
        (set)=>({
            user:null,
            setUser:(userData)=>set({user:userData}, false, "setUser"),
            clearUser:()=>set({user:null}, false, "clearUser")
        }),
        {name:'UserStore',
            enabled: true
        }
    )
)