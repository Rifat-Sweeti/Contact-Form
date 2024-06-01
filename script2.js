document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const fullName = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const subject = document.getElementById("subject");
    const mess = document.getElementById("message");
  
    // Logging elements to see which are null
    console.log('fullName:', fullName);
    console.log('email:', email);
    console.log('phone:', phone);
    console.log('subject:', subject);
    console.log('mess:', mess);
  
    function sendEmail() {
      if (fullName && email && phone && subject && mess) {
        const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Phone Number: ${phone.value}<br> Message: ${mess.value}`;
  
        Email.send({
          SecureToken: "a611244b-0821-4367-96f7-e6ac641838f5",
          To: 'owaisrazaqadri144@gmail.com',
          From: "owaisrazaqadri144@gmail.com",
          Subject: subject.value,
          Body: bodyMessage
        }).then(
          message => {
            if (message === "OK") {
              Swal.fire({
                title: "Success!",
                text: "Message Sent Successfully!",
                icon: "success"
              });
            }
          }
        );
      } else {
        console.error("One or more elements are missing in the DOM.");
      }
    }
  
    function checkInput() {
      const items = document.querySelectorAll(".item");
  
      for (const item of items) {
        if (item.value === "") {
          item.classList.add("error");
          item.parentElement.classList.add("error");
        }
  
        if (email && email.value !== "") {
          checkEmail();
        }
  
        email?.addEventListener("keyup", () => {
          checkEmail();
        });
  
        item.addEventListener("keyup", () => {
          if (item.value !== "") {
            item.classList.remove("error");
            item.parentElement.classList.remove("error");
          } else {
            item.classList.add("error");
            item.parentElement.classList.add("error");
          }
        });
      }
    }
  
    function checkEmail() {
      const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
      const errorTxtEmail = document.querySelector(".error-txt.email");
  
      if (email && !email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");
  
        if (email.value !== "") {
          errorTxtEmail.innerText = "Enter a valid Email Address";
        } else {
          errorTxtEmail.innerText = "Email Address can't be blank";
        }
      } else {
        email?.classList.remove("error");
        email?.parentElement.classList.remove("error");
      }
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      checkInput();
  
      if (![fullName, email, phone, subject, mess].some(input => input && input.classList.contains("error"))) {
        sendEmail();
        form.reset();
      }
    });
  });  