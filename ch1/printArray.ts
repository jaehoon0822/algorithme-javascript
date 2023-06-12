const strArr = [
  ["x", "x", "o", "x", "x"],
  ["x", "x", "o", "x", "x"],
  ["x", "x", "x", "x", "x"],
  ["x", "x", "o", "x", "x"],
  ["o", "x", "x", "x", "x"],
];

const printArray = (arr: string[][]) => {
  for (let i = 0; i < arr.length; i += 1) {
    let str = "";
    for (let j = 0; j < arr[i].length; j += 1) {
      str += `${arr[i][j]} `;
    }
    console.log(str);
  }
};

printArray(strArr);
