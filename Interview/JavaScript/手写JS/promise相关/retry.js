function getData() {
  return new Promise((resolve, rejct) => {
    const num = Math.random() * 10;
    if (num >= 5) {
      console.log('符合条件， num为：', num);
      resolve(num);
    } else {
      rejct(num);
    }
  });
}

function retry(func, times, delay) {
  return new Promise((resolve, reject) => {
    attempt();
    function attempt() {
      func().then(resolve).catch((err) => {
        console.log(`还有${times--}次尝试`);
        if (times === 0) {
          reject(err);
        } else {
          setTimeout(attempt, delay);
        }
      });
    }
  });
}

retry(getData, 3, 1000);