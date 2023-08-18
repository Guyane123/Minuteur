/**
 * faster way to use document.querySelector(selector)
 * @date 8/10/2023 - 1:33:15 PM
 *
 * @param {string} el
 * @returns {HTMLElement}
 */
function $(el) {
    return document.querySelector(el);
}

/**
 * Uppercase the first letter of a string
 * @date 8/10/2023 - 6:15:40 PM
 *
 * @param {*} string
 * @returns {string}
 */
function upperCaseFirstLetter(string) {
    const arrStr = string.split("");
    const str = [];
    arrStr.forEach((el, k) => {
        if (k == 0) {
            str.push(el.toUpperCase());
        } else {
            str.push(el);
        }
    });
    return str.join("").toString();
}

/**
 * Faster way to set the text of an HTML element
 * @date 8/18/2023 - 2:58:40 PM
 *
 * @param {HTMLElement} el
 * @param {String} Text
 */
function innerText(el, Text) {
    el.innerText = Text;
}

/**
 * Get the difference between two dates
 * @date 8/18/2023 - 3:00:04 PM
 *
 * @param {*} date1
 * @param {*} date2
 * @returns {{ sec: number; min: number; hour: number; day: number; }}
 */
function dateDiff(date1, date2) {
    let diff = {};
    let dateDiff = date2 - date1;

    dateDiff = Math.floor(dateDiff / 1000);
    diff.sec = dateDiff % 60;

    dateDiff = Math.floor((dateDiff - diff.sec) / 60);
    diff.min = dateDiff % 60;

    dateDiff = Math.floor((dateDiff - diff.min) / 60);
    diff.hour = dateDiff % 24;

    dateDiff = Math.floor((dateDiff - diff.hour) / 24);
    diff.day = dateDiff;

    return diff;
}

/**
 * get the number of month left using the numbers of days.
 * @date 8/10/2023 - 6:16:28 PM
 *
 * @param {*} currentMonth
 * @param {*} daysLeft
 * @return {void}
 */
function getMonthDiff(currentMonth, daysLeft, months) {
    let monthsLeft = months;
    diff.day = daysLeft;

    let days = new Date(new Date().getFullYear(), currentMonth, 0).getDate();

    if (daysLeft > days) {
        monthsLeft++;
        diff.day -= days;
        diff.month = monthsLeft;

        getMonthDiff(diff.month, diff.day, monthsLeft);
    } else {
        diff.month = monthsLeft;
    }
}
