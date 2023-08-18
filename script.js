let isParams = false;

for (let i = 0; i < window.location.href.length; i++) {
    if (window.location.href[i] == "?") {
        isParams = true;
    }
}

const now = new Date();
let currentHollidays;

const hollidays = [
    new Date(["2023-9-04", "9:00:00"]),

    new Date(["2023-10-20", "17:00:00"]),
    new Date(["2023-11-6", "09:00:00"]),

    new Date(["2023-12-22", "17:00:00"]),
    new Date(["2024-01-08", "9:00:00"]),

    new Date(["2024-02-23", "17:00:00"]),
    new Date(["2024-03-11", "9:00:00"]),

    new Date(["2024-04-19", "17:00:00"]),
    new Date(["2024-05-6", "9:00:00"]),

    new Date(["2024-07-05", "17:00:00"]),
];
do {
    currentHollidays = hollidays[0];

    hollidays.shift();
} while (now > currentHollidays);

// Check if a date is provided in the URL
if (isParams) {
    const paramsDate = window.location.href.split("?")[1];
    let isHours = false;

    for (let i = 0; i < paramsDate.length; i++) {
        if (paramsDate[i] == "&") {
            isHours = true;
        }
    }

    if (isHours) {
        currentHollidays = new Date([
            paramsDate.split("&")[0],
            paramsDate.split("&")[1],
        ]);
    } else {
        currentHollidays = new Date([paramsDate, "00:00:00"]);
    }
}

const diff = dateDiff(new Date(), currentHollidays);
getMonthDiff(new Date().getMonth(), diff.day, 0);

window.onload = function () {
    $(".until-date").innerHTML = currentHollidays.toLocaleDateString("fr", {
        day: "numeric",
        month: "long",
    });
    $(".until-full-date").innerHTML = currentHollidays.toLocaleDateString(
        "fr",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
        }
    );

    let elements = ["mois", "jours", "heures", "minutes", "secondes"];
    let diffElements = [diff.month, diff.day, diff.hour, diff.min, diff.sec];

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
        diff.sec -= 1;
        refreshElements();

        if (diff.sec <= 0) {
            diff.min--;
            diff.sec = 60;
        }
        if (diff.min <= 0) {
            diff.hour--;
            diff.min = 60;
        }
        if (diff.hour <= 0) {
            diff.day--;
            diff.hour = 60;
        }
        if (diff.day <= 0) {
            diff.month--;
            diff.day = new Date(now.getFullYear, now.getMonth() + 1).getDate();
        }

        diffElements = [diff.month, diff.day, diff.hour, diff.min, diff.sec];
    }, 1000);

    console.log(diff.month + " months");
    console.log(diff.day + " days");
    console.log(diff.hour + " hours");
    console.log(diff.min + " minutes");
    console.log(diff.sec + " Seconds");
};
