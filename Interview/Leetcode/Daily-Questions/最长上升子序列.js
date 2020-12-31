function LIS(arr) {
    // write code here
    let len = arr.length,
        left,
        right,
        dp = new Array(len).fill(1),
        maxVal = 0;
    for (let i = 0; i < len - 1; i++) {
        left = 0;
        right = i + 1;
        while (left < right) {
                let tmp = 0;
                if (arr[left] < arr[right]) {
                    dp[right] = Math.max(dp[right], dp[left] + 1);
                }
                ++left;
                dp[right] = arr[left] + 1  <= arr[right]? dp[left] + 1: dp[right];
                maxVal = Math.max(maxVal, dp[right])
        }
    }
    console.log(maxVal);
    let res = [];
    for (let i = len - 1; i >= 0; i--) {
        if(dp[i] === maxVal){
            res.unshift(arr[i]);
            maxVal--;
        }
    }
    console.log(dp);
    return res;
}
const arr = [2, 1, 5, 3, 6, 4, 8, 9, 7];
// const arr = [1, 2, 8, 6, 4];
console.log(LIS(arr));