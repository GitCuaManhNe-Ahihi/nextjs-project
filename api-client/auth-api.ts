import axiosClient from "./axios-client";
import { Auth } from "@/models/index";
export const authApi ={
    login(payload:Auth):Promise<any>{
        return axiosClient.post('/login', payload);
    },
    logout():Promise<any>{
        return  axiosClient.post('/logout');
    },
    getProfile():Promise<any> {
        return axiosClient.get('/profile');
    }
}
