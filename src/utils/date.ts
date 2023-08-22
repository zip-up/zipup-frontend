import { format } from "timeago.js";

export function parseDate(date: string) {
  return format(date);
}

// async function promise() {
//   new Promise((resolve, reject) => {
//     return setTimeout(() => resolve("success"), 5000);
//   }).then((res) => console.log(res));
// }

// promise().then((res) => console.log("res", res));