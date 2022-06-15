import { useRouter } from "next/router";
import useSWR from "swr";
import { PublicConfiguration } from "swr/dist/types";
import axiosClient from "../api-client/axios-client";
import { Auth } from "../models";

export const useAuth = (option?:Partial<PublicConfiguration>) => {
  const route = useRouter()
  const {data:profile,error,mutate} = useSWR('/profile',{
    dedupingInterval:60*60*1000,
    revalidateOnFocus:false,
    ...option
  });
  async function login(payload:Auth){
    const data = await axiosClient.post('/login',payload);
    await mutate();
    if(data.status === 200)
    {
      route.push('/');
    }
  }
  async function logout(){
    await axiosClient.post('/logout');
    await mutate({},false);
  }
  return {profile,error,login,logout};

}
