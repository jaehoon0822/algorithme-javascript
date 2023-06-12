# Big O 란 무엇인가?

이 코드가 얼마나 효율적으로 알려줄수 있는지 지표를 제공하는 방법론중 하나이다.
만약, 1 부터 N 까지 더하는 것을 코드로 구현한다고 하면 다음과 같다.

```ts
const addUpTo = (n: number) => {
  let total: number = 0;
  for (let i = 1; i <= n; i += 1) {
    total += i;
  }
  return total;
};
```

이를 다르게 구현할 수도 있다.

```ts
const addUpTo = (n: number) => {
  return (n * (n + 1)) / 2;
};
```

이를 보면 무엇이 나을지 벌써부터 감이 잡힌다.
반복문을 계속 돌려 값을 더하는것보다 2번째가 훨씬 낳을것 같다.

이때 어떠한 코드가 좋은 코드인지를 평가하는 기준은 다음의 3가지이다.

- 빠른가?
- 메모리 사용량이 적은가?
- 읽기 좋은가?

다음을 보도록 하자

```ts
const addUpTo = (n: number) => {
  let total: number = 0;
  for (let i = 1; i <= n; i += 1) {
    total += i;
  }
  return total;
};

let t1 = performance.now();
addUpTo(1000000000);
let t2 = performance.now();
console.log(`Time Elapsed: ${(t2 - t1) / 1000} sec`);
// Time Elapsed: 1.0321966680288315 sec
```

위는 대략 1초 정도 되는 시간이 걸린다고 볼 수 있다.

```ts
const addUpTo = (n: number) => {
  return (n * (n + 1)) / 2;
};

let t1 = performance.now();
addUpTo(1000000000);
let t2 = performance.now();
console.log(`Time Elapsed: ${(t2 - t1) / 1000} sec`);

// Time Elapsed: 0.000027107954025268554 sec
```
어마어마한 차이이다..  
하지만 이러게 매번 걸리는 시간을 확인하는것은 매우 비효울적인것이다.  
이때 사용하는것이 BigO 이다.


```ts
const addUpTo = (n: number) => {
  return (n * (n + 1)) / 2;
};
```
위는 `*`,`+`,`/` 으로 총 3번의 연산을 한다.

다음을 보자.
```ts
const addUpTo = (n: number) => {
  let total: number = 0;
  for (let i = 1; i <= n; i += 1) {
    total += i;
  }
  return total;
};
```

위는 `total`, `i` 에 대한 할당 으로 인한 할당연산 2번,
`<=` 비교가 `n` 번 일어났으며 `+`, `=` 이 `n` 번 2번일어난다.

> 여기서 `+`, `=` 는 `+=` 와 같다.  
이는 더하고 할당하는 연산이기에 각각 나누어 생각해야 한다.

측 `5n + 2` 이 된다고 볼 수 있다.
하지만, `BigO` 를 생각할때 중요한것은 입력의 크기와 실행시간의 관계를 말한다.

다시 코드를 보자.

```ts
const addUpTo = (n: number) => {
  return (n * (n + 1)) / 2;
};
```

위는 `n` 값이 증가하던 말던, 항상 3개의 연산식을 사용하여 값을 만들어 낸다.
이러한 것을 `BigO` 로 표현하면 `f(n)=1` 로 표현한다.

여기서 `f(n)` 의 `n`은 입력값이며, `1` 은 실행시간을 말한다.
그러므로 위의 뜻은 `n` 값이 얼마나 들어오든 말든 항상 실행시간은 `1` 이라는 상수값을 갖는다는 것이다.

이는 성능상 가장 좋은 방식이라 볼 수 있다.
반면에 다음을 보자

```ts
const addUpTo = (n: number) => {
  let total: number = 0;
  for (let i = 1; i <= n; i += 1) {
    total += i;
  }
  return total;
};
```

위는 `n` 이 증가할때마다 연산식도 늘어난다.
이를 표현하자면 `f(n) = n` 으로 표현할 수 있다.

실행시간이 `n` 값과 비례해서 증가함을 말한다.
이 코드는 `(5n) + 2` 라고 표현했는데, `BigO` 는 상관없이  
`n` 값만큼 비례헤서 증가되는 식이라면 단순하게 `f(n) = n` 으로 취급한다.

다음의 코드를 보도록 하자.
다음은 문자열이 들어가면 한글자씩 프린트하고, 문자열의 반대로 다시한번 프린트하는 코드이다.

```ts
const printWordANdReverse = (str: string) => {
  for (let i = 0; i < str.length; i += 1) {
    console.log(str[i]);
  }
  for (let i = str.length; 0 <= i; i -= 1) {
    console.log(str[i]);
  }
};

printWordANdReverse("hello");
```
위코드는 `for` 문이 2번 작동한다.
그리고 `str` 의 `length` 에 비례해서 2번 증가되는것을 볼 수 있다.
하지만 이는 `BigO` 로 표현하자면 `O(n)` 과 같다.
 
이는 별다른 차이 없이 `n * 2` 라 하더라도 큰 값에는 차이가 많지 않기 때문이다.

그러므로 `n * 2` 혹은 `n + 5` 이든 전부 `f(n) = n` 으로 취급한다.
즉 상수는 중요하지 않다.

`O(2n)` 이든 `O(500)` 이든 그냥 `O(n)` 이다.

반면에 `for` 문안에 `for` 문이 있다면 어떨까?

```ts
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

```

이는 `5` 개의 배열안에 `5` 개의 문자열이 들어간다.  
`n` 이 제곱되는 방식으로 이루어져 있다.  
즉 `n^2` 이다.

이렇게 `for` 문이 중복되는 상황은 `BigO` 로 표현하면 `O(n^2)` 라 한다.

