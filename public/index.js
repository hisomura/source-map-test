console.log("hello, world");

const today = new Date();
const message = `Hello, world! It's ${today.toDateString()}`;
const element = document.createElement("div");
element.innerHTML = message;
document.body.appendChild(element);
