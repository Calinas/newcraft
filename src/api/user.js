import axios from 'axios'

export function login(username,password){
    const url = '/api/v1/auth/login'
    const data = {
        phone: username,
        password: password,
        user_token: 'D9B3E2DC915F98BA2A8E333BCC258D0C'
    }
    return new Promise((resolve,reject) => {
        axios.post(url,{
            params: data
        }).then(res => {
            resolve(res)
        })
    })
}