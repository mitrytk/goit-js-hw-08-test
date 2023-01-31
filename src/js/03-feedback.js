import throttle from 'lodash.throttle';

const inputEmailEl = document.querySelector(".feedback-form input[name = email]");
const inputMessageEl = document.querySelector(".feedback-form textarea[name = message]");
const formEl = document.querySelector(".feedback-form");

let feedbackFormState = {};
const KEY_FEEDBACK_FORM_STATE = "feedback-form-state";

populateInputText();

inputEmailEl.addEventListener("input", throttle(onInputEmail, 500));
inputMessageEl.addEventListener("input", throttle(onInputMessage, 500));
formEl.addEventListener("submit", onFormSubmit);

function onInputEmail (evt) {
    feedbackFormState.email = evt.target.value;
    const jsonFeedback = JSON.stringify(feedbackFormState);
    localStorage.setItem(KEY_FEEDBACK_FORM_STATE, jsonFeedback);
}
function onInputMessage (evt) {
    feedbackFormState.message = evt.target.value;
    const jsonFeedback = JSON.stringify(feedbackFormState);
    localStorage.setItem(KEY_FEEDBACK_FORM_STATE, jsonFeedback);
}
function onFormSubmit (evt) {
    evt.preventDefault();
    if (inputEmailEl.value && inputMessageEl) {
        const stateFormArray = {
            email: inputEmailEl.value,
            message: inputMessageEl.value,
        }
        evt.currentTarget.reset();
        console.log(stateFormArray);
    }
}
function populateInputText() {
    if (localStorage.getItem(KEY_FEEDBACK_FORM_STATE)) {
        try {
            const stateParse = JSON.parse(localStorage.getItem(KEY_FEEDBACK_FORM_STATE));
            feedbackFormState = stateParse;
            if (stateParse.email) {
                inputEmailEl.value = stateParse.email;
            }
            if (stateParse.message) {
                inputMessageEl.value = stateParse.message;
            }
          } catch (error) {
            console.log("parse error")
          }
    }
}