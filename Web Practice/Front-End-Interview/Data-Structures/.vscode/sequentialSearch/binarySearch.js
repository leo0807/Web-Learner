Array.prototype.binarySearch = function(item){
    let low = 0;
    let high = this.length - 1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const element = this[mid];
        if(element < item){
            low = mid + 1;
        }else if( element > item){
            high = mid - 1;
        }else{
            return mid;
        }
    }
    return -1;
};

const arr = [5,4,3,2,1];