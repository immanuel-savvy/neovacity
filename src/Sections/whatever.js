async function firstSuccessfulPromise(promiseArray) {
  // Write your code here
  return Promise.any(promiseArray);
}

let promise = firstSuccessfulPromise([
  new Promise((resolve, reject) => reject()),
  new Promise((resolve, reject) => resolve("Success!")),
]);
promise
  .then((result) => console.log(result))
  .catch((e) => console.log(undefined));

module.exports.firstSuccessfulPromise = firstSuccessfulPromise;
