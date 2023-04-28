const form = document.getElementById("contact");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const btn = document.getElementById("btn");

async function submitForm() {
    event.preventDefault();

    btn.setAttribute("disabled", true);
    btn.innerHTML = "Submitting...";

    fetch("https://api.wdh.gg/forms/contact", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          firstname: firstName.value,
          lastname: lastName.value,
          email: email.value,
          message: message.value
      })
    }).then(res => res.json()).then(data => {
        form.reset();
        form.className += " hidden";

        if(data.code === "FORM_SUBMITTED") {
            document.getElementById("success").removeAttribute("class", "hidden");
        } else if(data.code === "RATE_LIMITED") {
            document.getElementById("ratelimited").removeAttribute("class", "hidden");
        } else {
            document.getElementById("error").removeAttribute("class", "hidden");
        }
    })
}
