import request from './request'
export function login({phone, password}){
    return request({
        url: `/login/cellphone`,
        data: {
            phone,
            password
        },
        method: 'POST'
    })
}