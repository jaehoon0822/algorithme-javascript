const printWordANdReverse = (str: string) => {
  for (let i = 0; i < str.length; i += 1) {
    console.log(str[i]);
  }
  for (let i = str.length; 0 <= i; i -= 1) {
    console.log(str[i]);
  }
};

printWordANdReverse("hello");
