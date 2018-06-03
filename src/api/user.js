import axios from 'axios'

export function login(username,password){
    const url = '/api/v1/auth/login'
    const data = {
        phone: username,
        password: password
    }
    return new Promise((resolve,reject) => {
        axios.post(url,{
            params: data
        }).then(res => {
            resolve(res)
        })
    })
}