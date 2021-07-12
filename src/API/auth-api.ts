import {axiosInstance} from './api';
import {AxiosResponse} from 'axios';
import {UserType} from '../redux/auth-reducer';

type LoginResponseType = {
    tokenType: string,
    expiresAt: string,
    accessToken: string,
    refreshToken: string
}

export const authAPI = {
    login(clientId: number, email: string, password: string) {
        return axiosInstance.post<AxiosResponse<LoginResponseType>>(`/api/auth/user`, {clientId, email, password})
            .then(res => res)
    },
    logout() {
        return axiosInstance.post<{ success: boolean }>(`/api/tager/user/profile/logout`)
            .then(res => res)
    },
    getUser() {
        return axiosInstance.get<AxiosResponse<UserType>>(`/api/tager/user/profile`)
            .then(res => res)
    },
}
