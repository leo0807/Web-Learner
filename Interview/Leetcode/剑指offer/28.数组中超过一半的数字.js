function MoreThanHalfNum_Solution(numbers) {
    // write code here
    numbers.sort((a, b) => {
        return a - b;
    });
    const length = numbers.length;
    const half = Math.floor(length / 2);
    for (let i = 0; i < length; i++) {
        if (numbers[i] === numbers[i + half]) {
            return numbers[i];
        }
    }
    return 0;
}