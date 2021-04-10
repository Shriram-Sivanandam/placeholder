import React from "react";
import emailjs from "emailjs-com";
import "./Register.css";

function Form() {
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_rqvkjrq",
        "template_66nmfu7",
        e.target,
        "user_ecruCvVcl9HQPDdzCalcx"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  }

  return (
    <div>
      <div className="container">
        <form className="form" onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" placeholder="Your Name..." name="name"></input>
          <label>Email ID</label>
          <input
            type="text"
            placeholder="Your Email ID..."
            name="phoneNumber"
          ></input>
          <label>Review</label>
          <textarea
            type="text"
            placeholder="Your Review/Story..."
            name="address"
          ></textarea>
          <button className="btns" type="submit" value="Send Message">
            Send Review
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
