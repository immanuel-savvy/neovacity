import { month_index } from "../../../Constants/constants";

const charset =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const combinations = {
  alnum: charset,
  num: "01234556789",
  alpha: "abcdefghijklmnopqrstuvwxyz",
};

const shuffle_array = (array) => {
  const new_array = [...array];
  const length = new_array.length;

  for (let start = 0; start < length; start++) {
    const random_position = Math.floor(
      (new_array.length - start) * Math.random()
    );
    const random_item = new_array.splice(random_position, 1);

    new_array.push(...random_item);
  }

  return new_array;
};

const to_title = (string) => {
  if (!string) return string;

  let str = "";
  string.split(" ").map((s) => {
    if (s) str += " " + s[0].toUpperCase() + s.slice(1);
  });
  return str.trim();
};

const date_string = (timestamp) => {
  let date = new Date(timestamp);
  return `${date.getDate().toString().padStart(2, "0")} ${to_title(
    month_index[date.getMonth()]
  )} ${date.getFullYear()}`;
};

const generate_random_string = (len, combination) => {
  let string = "";
  combination = combinations[combination] || combinations["num"];

  for (let i = 0; i < (len || 6); i++)
    string += combination[gen_random_int(combination.length)];

  return string;
};

const gen_random_int = (max_int, min_int = 0) =>
  min_int + Math.floor(Math.random() * max_int);

let phone_regex =
  /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;

let email_regex =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export {
  to_title,
  gen_random_int,
  generate_random_string,
  email_regex,
  phone_regex,
  date_string,
  shuffle_array,
};
