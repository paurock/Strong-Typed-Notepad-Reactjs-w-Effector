const nowDate = () => new Date();
const hms = nowDate => [
  { day: nowDate.getDate() },
  { month: nowDate.getMonth() + 1 },
  { hours: nowDate.getHours() },
  { minutes: nowDate.getMinutes() }
];

const addZero = arr =>
  arr.map((x, i) => {
    x = Object.values(arr[i]);
    return x < 10 ? "0" + x : x;
  });
const hhmmyyyy = arr => {
  const year = nowDate().getFullYear();
  return `Date: ${arr[0]}.${arr[1]}.${year} Time: ${arr[2]}:${arr[3]}`;
};

const compose = fns => val => fns.reduce((fn1, fn2) => fn2(fn1), val);
const composed = compose([nowDate, hms, addZero, hhmmyyyy]);
export const Ddmmyyyy = () => composed();
