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
 * Check if the given number is negativ
 * @date 8/10/2023 - 5:13:46 PM
 *
 * @param {number} diff
 * @param {*} currentHollidaysGet
 * @param {*} nowGet
 * @returns {number}
 */

function innerText(el, Text) {
    el.innerText = Text;
}

const now = new Date();
let currentHollidays;
const hollidays = [
    new Date(["2023-9-03", "23:59:59"]),

    new Date(["2023-10-20", "23:59:59"]),
    new Date(["2023-11-5", "23:59:59"]),

    new Date(["2023-12-22", "23:59:59"]),
    new Date(["2024-01-07", "23:59:59"]),

    new Date(["2024-02-23", "23:59:59"]),
    new Date(["2024-03-10", "23:59:59"]),

    new Date(["2024-04-19", "23:59:59"]),
    new Date(["2024-05-5", "23:59:59"]),

    new Date(["2024-07-05", "23:59:59"]),
];

do {
    currentHollidays = hollidays[0];

    hollidays.shift();
} while (now > currentHollidays);

const diffTime = Math.abs(new Date() - currentHollidays);
let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
let daysLeftNextMonth = diffDays;
let diffMonths;

getMonthDiff(now.getMonth(), diffDays, 0);

let diffHours = currentHollidays.getHours() - now.getHours();
diffHours = checkIfNegativ(
    diffHours,
    currentHollidays.getHours(),
    now.getHours()
);
let diffMinutes = currentHollidays.getMinutes() - now.getMinutes();
diffMinutes = checkIfNegativ(
    diffMinutes,
    currentHollidays.getMinutes(),
    now.getMinutes()
);
let diffSeconds = currentHollidays.getSeconds() - now.getSeconds();

const numberOfDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();

function checkIfNegativ(diff, currentHollidaysGet, nowGet) {
    if (diff >= 0) {
        return (diff = currentHollidaysGet - nowGet);
    } else {
        return 0;
    }
}

/**
 * get the number of month left using the numbers of days.
 * TODO: Make this code better
 * @date 8/10/2023 - 6:16:28 PM
 *
 * @param {*} currentMonth
 * @param {*} daysLeft
 * @returns {number}
 */

function getMonthDiff(currentMonth, daysLeft, months) {
    let month = currentMonth;
    let monthsLeft = months;
    daysLeftNextMonth = daysLeft;

    let days = new Date(new Date().getFullYear(), month, 0).getDate();

    if (daysLeft > days) {
        monthsLeft++;
        daysLeftNextMonth -= days;
        diffMonths = monthsLeft;
        month++;

        getMonthDiff(month, daysLeftNextMonth, monthsLeft);
    } else {
        diffMonths = monthsLeft;
    }
}

window.onload = function () {
    $(".until-date").innerHTML = currentHollidays.toLocaleDateString("fr", {
        day: "numeric",
        month: "long",
    });
    $(".until-full-date").innerHTML = currentHollidays.toLocaleDateString(
        "fr",
        { weekday: "long", day: "numeric", month: "long", year: "numeric" }
    );

    let elements = ["mois", "jours", "heures", "minutes", "secondes"];
    let diffElements = [
        diffMonths,
        daysLeftNextMonth,
        diffHours,
        diffMinutes,
        diffSeconds,
    ];

    function refreshElements() {
        elements.forEach((element, k) => {
            innerText($(`.${element}`), `${diffElements[k]}`);
            innerText(
                $(`.${element}-span`),
                `${upperCaseFirstLetter(element)}`
            );
        });
    }

    refreshElements();

    // Dynamic timer
    setInterval(() => {

        diffSeconds -= 1;

        if (diffSeconds <= 0) {
            diffMinutes--;
            diffSeconds = 60;
        }
        if (diffMinutes <= 0) {
            diffHours--;
            diffMinutes = 60;
        }
        if (diffHours <= 0) {
            diffDays--;
            diffHours = 60;
        }
        if (diffDays <= 0) {
            diffMonths--;
            diffDays = new Date(now.getFullYear, now.getMonth() + 1).getDate();
        }
        diffElements = [
            diffMonths,
            daysLeftNextMonth,
            diffHours,
            diffMinutes,
            diffSeconds,
        ];
        refreshElements();
    }, 1000);

    console.log(diffMonths + " months");
    console.log(diffDays + " days");
    console.log(diffHours + " hours");
    console.log(diffMinutes + " minutes");
    console.log(diffSeconds + " Seconds");
};
