
test('toBeNull Macther1', () => {
    const a = null;
     expect(a).toBeNull();
})

test('toBeNull Macther1', () => {
    const a = {number: '007'};
     expect(a).toEqual({number: '007'});
})


test('toBeDefined Macther1', () => {
    const a = "123";
     expect(a).toBeDefined();
})

test('toBeUndefined Macther', () => {
    const a = undefined;
    expect(a).toBeUndefined();
})

test('toBeTruthy Macther', () => {
    const a = 1;
    expect(a).toBeTruthy();
})

test('toBeFalsy Macther', () => {
    const a = 0;
    expect(a).toBeFalsy();
})

test('toBeGreaterThan Macther', () => {
    const a = 10;
    expect(a).toBeGreaterThan(9);
})

test('toBeGreaterThanOrEqual Macther', () => {
    const a = 10;
    expect(a).toBeGreaterThanOrEqual(10);
})


test('toBeLessThan Macther', () => {
    const a = 10;
    expect(a).toBeLessThan(11);
})

test('toBeCloseTo Macther', () => {
    const a = 0.1;
    const b = 0.2;
    expect(a + b).toBeCloseTo(0.3);
})

test('toMatch Macther', () => {
    const a = "a,b,c";
    const b = "b";
    expect(a).toMatch(b);
})

test('toContain Macther', () => {
    const a = ["a","b","c"];
    const b = "b";
    expect(a).toContain(b);
})

test('toContain Macther', () => {
    const a = ["a","b","c"];
    const data =  new Set(a);
    const b = "b";
    expect(data).toContain(b);
})

const throwNewErrorFunc = () => {
    throw new Error ('error');
}

test('toThrow Macther', () => {
    expect(throwNewErrorFunc).toThrow('error');
})

const throwNewErrorFunc1 = () => {
    // throw new Error ('error');
}

test('toThrow Macther', () => {
    expect(throwNewErrorFunc1).not.toThrow();
})