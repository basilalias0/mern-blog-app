import Cookies from 'js-cookie'

const getUserData = Cookies.get('userData')
export const userData = getUserData ? JSON.parse(getUserData) : null
