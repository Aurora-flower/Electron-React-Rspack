onmessage = function (event) {
  console.log("Worker received message:", event.data);
  postMessage("Hello, Main thread!");
};
