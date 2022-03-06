// Login과 Logout, Register관련하여 서버와 통신하는 코드


import axios from 'axios';

const ACCESS_KEY = 'accessKey';
const REFRESH_KEY = 'refreshKey';


export const Register = (userInfo, navigate) => {
    const URL = "/account/register"

    axios.post(URL, userInfo).then(res => {
        console.log(res.data);
        alert("성공");
        navigate('/signin?tab=signin');
    }).catch(err=>{
        console.log(err);
        alert('오류발생');
    })
}

export const login = (userInfo, navigate) => {
    const URL = "/account/login";

    axios.post(URL, userInfo).then(res => {
        localStorage.setItem(ACCESS_KEY, res.data.access);
        localStorage.setItem(REFRESH_KEY, res.data.refresh);
        alert("성공");
        navigate('/');
    }).catch(err=>console.log(err))
}

export const logout = (navigate) => {
    const URL = "/account/logout"
    const refreshToken = localStorage.getItem(REFRESH_KEY);
    axios.post(URL, {refresh: refreshToken}).then(res=>{
        console.log(res.data);
    }).catch(err=>console.log(err))
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    alert("성공")
    navigate('/');
}

export const refresh = () => {
    // const URL = "/account/refresh"
    const URL = "https://ec5fbd63-aaa3-42c5-b672-efdd5707128d.mock.pstmn.io/account/refresh"
    const data = {refresh: localStorage.getItem(REFRESH_KEY)};
    const headers = {Authorization: "Bearer " + localStorage.getItem(ACCESS_KEY)}
    axios.post(URL, data, headers).then(res => {
        console.log(res.data);
        localStorage.setItem(ACCESS_KEY, res.data.access);
        alert("성공");
    }).catch(err=>{
        console.log(err);
        alert("실패");
    })
}


export const isLogin = () => {
    if (localStorage.getItem(ACCESS_KEY)) {
        return true;
    }
    return false;
}