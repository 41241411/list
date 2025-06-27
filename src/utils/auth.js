// 假設用 localStorage 儲存登入狀態
export function isLoggedIn() {
    return !!localStorage.getItem('isLoggedIn')
}

export function setLoggedIn(val) {
    if (val) {
        localStorage.setItem('isLoggedIn', '1')
    } else {
        localStorage.removeItem('isLoggedIn')
    }
}
