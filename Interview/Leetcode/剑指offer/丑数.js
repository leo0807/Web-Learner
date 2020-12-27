function GetUglyNumber_Solution(index) {
    // write code here
    if (index === 0) return 0;
    let dp = [0];
    dp[0] = 1;
    let n2 = 0,
        n3 = 0,
        n5 = 0;

    for (let i = 1; i < index; i++) {
        dp[i] = Math.min(dp[n2] * 2, dp[n3] * 3, dp[n5] * 5);
        if (dp[i] == dp[n2] * 2) n2++;
        if (dp[i] == dp[n3] * 3) n3++;
        if (dp[i] == dp[n5] * 5) n5++;
    }
    return dp[index - 1];
}
// 说下思路，如果p是丑数，那么p=2^x * 3^y * 5^z
// 那么只要赋予x,y,z不同的值就能得到不同的丑数。
// 如果要顺序找出丑数，要知道下面几个特（fei）点（hua）。
// 对于任何丑数p：
// （一）那么2*p,3*p,5*p都是丑数，并且2*p<3*p<5*p
// （二）如果p<q, 那么2*p<2*q,3*p<3*q,5*p<5*q
// 现在说说算法思想：
//     由于1是最小的丑数，那么从1开始，把2*1，3*1，5*1，进行比较，得出最小的就是1
// 的下一个丑数，也就是2*1，
//     这个时候，多了一个丑数‘2’，也就又多了3个可以比较的丑数，2*2，3*2，5*2，
// 这个时候就把之前‘1’生成的丑数和‘2’生成的丑数加进来也就是
// (3*1,5*1,2*2，3*2，5*2)进行比较，找出最小的。。。。如此循环下去就会发现，
// 每次选进来一个丑数，该丑数又会生成3个新的丑数进行比较。