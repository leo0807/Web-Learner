function merge(intervals) {
    // write code here
    if (intervals.length < 2) return intervals;
    intervals.sort((a, b) => { return a.start - b.start });
    let res = [], pre = intervals[0];
    for (let i = 1, len = intervals.length; i < len; i++) {
        if (intervals[i].start <= pre.end) {
            pre.end = Math.max(pre.end, intervals[i].end);
        } else {
            res.push(pre);
            pre = intervals[i];
        }
    }
    res.push(pre);
    return res;

}