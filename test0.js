let executeCount = 0;
const targetFn = async nums => {
  executeCount++;
  return nums.map(num => 2 * num + 1);
};

const batcher = (fn) => {
  return (nums) => {
      return new Promise((res)=>{
          res(fn(nums));
      })
  }
}

const batchedFn = batcher(targetFn);

const main = async () => {
  const [result1, result2, result3] = await Promise.all([
    batchedFn([1, 2, 3]),
    batchedFn([4, 5]),
    batchedFn([6, 7]),
  ]);

  console.log(result1, result2, result3)
  console.log(executeCount)  // 预期为 1
} 

main()