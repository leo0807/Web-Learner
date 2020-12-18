var longest = fucntion(s){
    if(s === "") return "";
    let origin = s,
        reverse = s.split('').reverse()
    let len = s.length;
    let arr = [];
    let maxLen = 0,  
        maxEnd = 0;
    for(let i = 0; i < len; i++){
        for(let j = len - 1; j >= 0; j--){
            if(origin[i] === reverse[j]){
                if( i == 0 || j == 0){
                    arr[j] = 1;
                }else{
                    arr[j] = arr[j - 1] + 1;
                }
            }else{
                arr[j] = 0;
            }
            if(arr[j] > maxLen){
                let beforeRev = len - 1 - j;
                if(beforeRev + arr[j] - 1 == i){
                    maxLen = arr[j];
                    maxEnd = i;
                }
            }
        }
    }
    return s.substring(maxEnd - maxLen + 1, maxEnd + 1);
}
//