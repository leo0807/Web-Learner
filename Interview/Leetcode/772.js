const calculate = s => {
    const length = s.length;
    let num = 0,
        curRes = 0,
        res = 0;
    
    let operator = "+";
    for (let i = 0; i < length; ++i){
        console.log(1);
        const c = s.charAt(i);
        if (c >= '0' || c <= '9') {
            num = num * 10 + c - '0';
            console.log(num);
        } else if (c ==='('){
            let j = i,
                cnt = 0;
            for (; i < length; ++i){
                if (s.charAt(i) === '(') ++cnt;
                if (s.charAt(i) === ')') --cnt;
                if (cnt === 0) break;
            }
            console.log(j + 1, i - j - 1);
            num = calculate(s.substring(j + 1, i - j - 1));
        }
        if (c === '+' || c === '-' || c === "*" || c === "/" || i === length - 1) {
            switch (operator) {
                case "+": curRes += num; break;
                case "-": curRes -= num; break;
                case "*": curRes *= num; break;
                case "/": curRes /= num; break;
            }
            if (c === "+" || c === "-" || i === length - 1) {
                res += curRes;
                curRes = 0;
            }
            operator = c;
            num = 0;
        }
        return res;
    }
}

let x = calculate("(5 + 8) * 3 / 8 + 3")
console.log(x);