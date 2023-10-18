
const key1 = 'token';

export const getToken = () => {
     return localStorage.getItem(key1)
}
export const saveToken = (token: string) => {
    return localStorage.setItem(key1, token);
}
export const removeToken = () => {
    return localStorage.removeItem(key1)
}
