import Swal from 'sweetalert2'

export function showLoginAlert() {
    return Swal.fire({
        icon: 'warning',
        title: '請先登入',
        text: '您必須登入才能使用此功能',
        confirmButtonText: '前往登入',
    })
}
