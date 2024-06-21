import Cookies from 'js-cookie'

const getUserData = Cookies.get('userData')
export const userData = JSON.parse(getUserData)
