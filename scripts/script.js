$(document).ready(function() {
    // update app with data from local storage
    for (let i = 0; i <= 8; i++) {
        let storedItem = localStorage.getItem("hour-" + i);
        $("#hour-" + i + "-text").val(storedItem);
    }

    // save data in field to local storage. delete localStorage key if field is empty
    function saveText(event) {
        let target = event.target;
        let keyName;
        let textareaValue;
        let rowElement;
        console.log(target);

        if (target.tagName == "DIV") {
            textareaValue = target.previousElementSibling.children[0].value;
            rowElement = target.parentElement.getAttribute("data-index");
            keyName = "hour-" + rowElement;
        } else {
            textareaValue =
                target.parentElement.previousElementSibling.children[0].value;
            rowElement = target.parentElement.parentElement.getAttribute(
                "data-index"
            );
            keyName = "hour-" + rowElement;
        }

        if (textareaValue !== "") {
            localStorage.setItem(keyName, textareaValue);
        } else {
            localStorage.removeItem(keyName);
        }
    }

    // Change background color of hour rows based on time of day
    $("#currentDay").text(moment().format("dddd, MMMM Do, YYYY"));

    let currentHour = moment()
        .format("LT")
        .split(":")
        .shift();

    let isAM;

    let ampm = moment()
        .format("LT")
        .split(" ")
        .pop();

    if (ampm == "AM") {
        isAM = true;
    } else {
        isAM = false;
    }

    if (isAM) {
        for (let i = 3; i <= 8; i++) {
            let hourRow = $(".hour[data-index=" + i + "]");
            hourRow.next().addClass("future");
        }

        for (let i = 0; i <= 2; i++) {
            let hourRow = $(".hour[data-index=" + i + "]");
            if (hourRow.attr("data-hour") == currentHour) {
                hourRow.next().addClass("present");
            }
            // need to use parseInt so that the integer values are compared instead of the string chacter values
            else if (
                parseInt(hourRow.attr("data-hour")) > parseInt(currentHour)
            ) {
                hourRow.next().addClass("future");
            } else if (
                parseInt(hourRow.attr("data-hour")) < parseInt(currentHour)
            ) {
                hourRow.next().addClass("past");
            }
        }
    } else {
        for (let i = 0; i <= 2; i++) {
            let hourRow = $(".hour[data-index=" + i + "]");
            hourRow.next().addClass("past");
        }

        if (currentHour == 12) {
            $(".hour[data-hour=12]")
                .next()
                .addClass("present");
            $(".hour[data-hour=1]")
                .next()
                .addClass("future");
            $(".hour[data-hour=2]")
                .next()
                .addClass("future");
            $(".hour[data-hour=3]")
                .next()
                .addClass("future");
            $(".hour[data-hour=4]")
                .next()
                .addClass("future");
            $(".hour[data-hour=5]")
                .next()
                .addClass("future");
        } else {
            $(".hour[data-hour=12]")
                .next()
                .addClass("past");

            for (let i = 4; i <= 8; i++) {
                let hourRow = $(".hour[data-index=" + i + "]");

                if (hourRow.attr("data-hour") == currentHour) {
                    hourRow.next().addClass("present");
                } else if (
                    parseInt(hourRow.attr("data-hour")) > parseInt(currentHour)
                ) {
                    hourRow.next().addClass("future");
                } else if (
                    parseInt(hourRow.attr("data-hour")) < parseInt(currentHour)
                ) {
                    hourRow.next().addClass("past");
                }
            }
        }
    }

    // event listeners
    $(".saveBtn").on("click", saveText);
});
