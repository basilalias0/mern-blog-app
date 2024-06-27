import Cookies from 'js-cookie'

export const getUserData= ()=>Cookies.get('userData')
export const userData = getUserData() ? JSON.parse(getUserData()) : null
