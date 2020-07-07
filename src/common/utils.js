// 防抖操作
export function debounce(func, delay){
    let timer = null
    return (...args) => {
        if(timer)clearTimeout(timer)
        timer = setTimeout(() => {
            func(this, args)
        }, delay)
    }
}