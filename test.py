def findMiss(nums):
    n = len(nums)
    i = 0
    sum_val = 0
    while i != n:
        sum_val += nums[i]
        i += 1
    return n * (n + 1) / 2 - sum_val
print(findMiss([3,0,1]))