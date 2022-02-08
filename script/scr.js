let interval,
  time,
  i1 = 10,
  i2 = 20;
let checkVal = (current_form_value, current_to_value) => {
  return new Promise((resolve, reject) => {
    for (let k = 0; k < 3; k++) {
      if (
        document.getElementById(String(k + 1) + "-queue-from").innerHTML ==
          current_form_value ||
        document.getElementById(String(k + 1) + "-queue-to").innerHTML ==
          current_to_value ||
        document.getElementById(String(k + 1) + "-queue-from").innerHTML ==
          current_to_value ||
        document.getElementById(String(k + 1) + "-queue-to").innerHTML ==
          current_form_value
      ) {
        let val_from = document.getElementById(
          String(k + 1) + "-queue-from"
        ).innerHTML;
        let val_to = document.getElementById(
          String(k + 1) + "-queue-to"
        ).innerHTML;

        document.getElementById(String(k + 1) + "-queue-from").innerHTML = 0;
        document.getElementById(String(k + 1) + "-queue-to").innerHTML = 0;

        document.getElementById(val_from).innerHTML = 0;
        document.getElementById(val_to).innerHTML = 0;

        document.getElementById("from").value = val_from;
        document.getElementById("destination").value = val_to;
        document.getElementById("start").click();
      }
    }
    resolve(true);
  });
};
// shifting the table
let shifting = (id) => {
  let num = id.split("-")[0];
  let current_form = document.getElementById(String(num) + "-from");
  let current_to = document.getElementById(String(num) + "-to");
  let current_duration = document.getElementById(String(num) + "-time");

  let current_form_value = current_form.innerHTML;
  let current_to_value = current_to.innerHTML;
  let current_duration_value = current_duration.innerHTML;

  current_duration.style.color = "black";
  let completed = document.getElementById("completed");
  let div_row = document.createElement("div");
  div_row.classList.add("row");
  let div_col1 = document.createElement("div");
  div_col1.classList.add("col");
  div_col1.classList.add("border-set");
  let from_val = document.createTextNode(current_form_value);
  div_col1.appendChild(from_val);
  div_row.appendChild(div_col1);
  let div_col2 = document.createElement("div");
  div_col2.classList.add("col");
  div_col2.classList.add("border-set");
  let to_val = document.createTextNode(current_to_value);
  div_col2.appendChild(to_val);
  div_row.appendChild(div_col2);
  let div_col3 = document.createElement("div");
  div_col3.classList.add("col");
  div_col3.classList.add("border-set");
  let time_val = document.createTextNode(current_duration_value);
  div_col3.appendChild(time_val);
  div_row.appendChild(div_col3);
  completed.appendChild(div_row);

  document.getElementById(current_form.innerHTML).innerHTML = 0;
  document.getElementById(current_to.innerHTML).innerHTML = 0;
  current_form.innerHTML = 0;
  current_to.innerHTML = 0;
  current_duration.innerHTML = 0;
  for (let i = 0; i < 3; i++) {
    let current_form = document.getElementById(String(i + 1) + "-from");
    let current_to = document.getElementById(String(i + 1) + "-to");
    let current_duration = document.getElementById(String(i + 1) + "-time");
    let next_form = document.getElementById(String(i + 2) + "-from");
    let next_to = document.getElementById(String(i + 2) + "-to");
    let next_duration = document.getElementById(String(i + 2) + "-time");
    if (
      current_form.innerHTML == 0 ||
      current_to.innerHTML == 0 ||
      current_duration.innerHTML == 0
    ) {
      current_form.innerHTML = next_form.innerHTML;
      current_to.innerHTML = next_to.innerHTML;
      current_duration.innerHTML = next_duration.innerHTML;
      next_form.innerHTML = 0;
      next_to.innerHTML = 0;
      next_duration.innerHTML = 0;
    }
  }
  checkVal(current_form_value, current_to_value).then((ans) => {
    for (let i = 0; i < 2; i++) {
      let current_queue_form = document.getElementById(
        String(i + 1) + "-queue-from"
      );
      let current_queue_to = document.getElementById(
        String(i + 1) + "-queue-to"
      );
      let next_queue_form = document.getElementById(
        String(i + 2) + "-queue-from"
      );
      let next_queue_to = document.getElementById(String(i + 2) + "-queue-to");
      if (
        current_queue_form.innerHTML == 0 ||
        current_queue_to.innerHTML == 0
      ) {
        current_queue_form.innerHTML = next_queue_form.innerHTML;
        current_queue_to.innerHTML = next_queue_to.innerHTML;
        next_queue_form.innerHTML = 0;
        next_queue_to.innerHTML = 0;
      }
    }
  });
};

// set Initial time
window.onload = () => {
  time = 0;
  interval = setInterval(() => {
    time++;
    document.getElementById("time").innerHTML = time;
  }, 1000);
  setInterval(() => {
    let value_checking_time = document.getElementsByClassName("time-going-on");
    for (let i = 0; i < value_checking_time.length; i++) {
      let current_id = value_checking_time[i].id;
      let value = document.getElementById(current_id);
      if (value.innerHTML != 0) {
        let current_value = value.innerHTML;
        let time_remaining = current_value - time;
        if (time_remaining < 15 && time_remaining > 10) {
          value.style.color = "yellow";
        } else if (time_remaining <= 10) {
          value.style.color = "red";
        }
        if (time_remaining <= 0) {
          shifting(current_id);
        }
      }
    }
  }, 1000);
};

// setting dropdown choose sequence
$(".from-class").click(function () {
  let from_id = this.id;
  let val = from_id.split("-")[0];
  document.getElementById("from").value = val;
  let toClass = document.getElementsByClassName("to-class");
  for (let i = 0; i < toClass.length; i++) {
    let id = toClass[i].id;
    if (id == val + "-to") {
      document.getElementById(id).classList.add("disabled");
    } else {
      document.getElementById(id).classList.remove("disabled");
    }
  }
});
$(".to-class").click(function () {
  let to_id = this.id;
  let val = to_id.split("-")[0];
  document.getElementById("destination").value = val;
  let fromClass = document.getElementsByClassName("from-class");
  for (let i = 0; i < fromClass.length; i++) {
    let id = fromClass[i].id;
    if (id == val + "-from") {
      document.getElementById(id).classList.add("disabled");
    } else {
      document.getElementById(id).classList.remove("disabled");
    }
  }
});

// Random Number Generator
let randomNumGen = () => {
  return new Promise((res) => {
    let i3 = ((i1 + i2) % 60) + 10;
    i1 = i2;
    i2 = i3;
    res(i3);
  });
};
// For stopping clock
let stop_clock = document.getElementById("stop");
stop_clock.onclick = function () {
  clearInterval(interval);
};

// Resuming the clock
let resume_clock = document.getElementById("resume");
resume_clock.onclick = () => {
  interval = setInterval(() => {
    time++;
    document.getElementById("time").innerHTML = time;
  }, 1000);
};
//checking empty places
let empty_places = (given_class) => {
  return new Promise((resolve, reject) => {
    let place_class = document.getElementsByClassName(given_class);
    for (let i = 0; i < place_class.length; i++) {
      let id = place_class[i].id;
      if (document.getElementById(id).innerHTML === "0") {
        resolve(i + 1);
      }
    }
  });
};

// setting the submit sequence
let button = document.getElementById("start");
button.onclick = function () {
  // on submit removing the disabled buttons
  let fromClass = document.getElementsByClassName("from-class");
  let toClass = document.getElementsByClassName("to-class");
  for (let i = 0; i < toClass.length; i++) {
    let id1 = toClass[i].id;
    let id2 = fromClass[i].id;
    document.getElementById(id1).classList.remove("disabled");
    document.getElementById(id2).classList.remove("disabled");
  }
  // getting the values for processing
  let from = document.getElementById("from").value;
  let to = document.getElementById("destination").value;
  let from_status = document.getElementById(from);
  let to_status = document.getElementById(to);
  // Clearing th value
  document.getElementById("from").value = "";
  document.getElementById("destination").value = "";
  // checking if line is busy
  //if non of them are busy go to call
  if (from_status.innerHTML == 0 && to_status.innerHTML == 0) {
    from_status.innerHTML = 1;
    to_status.innerHTML = 1;
    randomNumGen().then((duration) => {
      empty_places("from-going-on")
        .then((empty_status) => {
          let from_id = String(empty_status) + "-from";
          let to_id = String(empty_status) + "-to";
          let duration_id = String(empty_status) + "-time";
          document.getElementById(from_id).innerHTML = from;
          document.getElementById(to_id).innerHTML = to;
          document.getElementById(duration_id).innerHTML = String(
            duration + time
          );
        })
        .catch((sts) => {
          window.alert("Line is Full");
        });
    });
  } else if (
    (from_status.innerHTML == 1 && to_status.innerHTML == 0) ||
    (from_status.innerHTML == 0 && to_status.innerHTML == 1)
  ) {
    from_status.innerHTML = 1;
    to_status.innerHTML = 1;
    empty_places("from-queue")
      .then((empty_status) => {
        let from_id = String(empty_status) + "-queue-from";
        let to_id = String(empty_status) + "-queue-to";
        document.getElementById(from_id).innerHTML = from;
        document.getElementById(to_id).innerHTML = to;
      })
      .catch((sts) => {
        window.alert("Queue Full");
      });
  } else {
    window.alert("Already in call!");
  }
};
