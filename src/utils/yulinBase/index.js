/**
 *  日期格式化函数
 * @param {*} date new Date()
 * @param {*} format 'yyyy-MM-dd HH:mm:ss'
 * @returns
 */
export function formatDate(date, format) {
    console.log(date,typeof date)
    if(typeof date === "string"){
        return date
    }
    if(typeof date === "undefined" ||  date === null){
        return ''
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    function padZero(num) {
        return num < 10 ? "0" + num : num;
    }

    return format
        .replace("yyyy", year)
        .replace("MM", padZero(month))
        .replace("dd", padZero(day))
        .replace("HH", padZero(hours))
        .replace("mm", padZero(minutes))
        .replace("ss", padZero(seconds));
}
