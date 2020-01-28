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
  isAM = false; // change back to false
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
    } else if (parseInt(hourRow.attr("data-hour")) > parseInt(currentHour)) {
      // need to use parseInt so that the integers values are compared instead of the string chacter values
      hourRow.next().addClass("future");
    } else if (parseInt(hourRow.attr("data-hour")) < parseInt(currentHour)) {
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
    for (let i = 4; i <= 8; i++) {
      $(".hour[data-hour=12]")
        .next()
        .addClass("past");

      let hourRow = $(".hour[data-index=" + i + "]");

      if (hourRow.attr("data-hour") == currentHour) {
        hourRow.next().addClass("present");
      } else if (parseInt(hourRow.attr("data-hour")) > parseInt(currentHour)) {
        hourRow.next().addClass("future");
      } else if (parseInt(hourRow.attr("data-hour")) < parseInt(currentHour)) {
        hourRow.next().addClass("past");
      }
    }
  }
}
