class ConfigureVals {
    //write your code here
    constructor(xpoint, ypoint, shape) {
        this.xpoint = xpoint || 0;
        this.ypoint = ypoint || 0;
        this.shape = shape || null;
    }
}
ConfigureVals.getConfiguration = (function () {
    // console.log(config);
    let instance;
    return function (config) {
        if (!instance) {
            instance = new ConfigureVals(config.xpoint, config.ypoint, config.shape);
        }
        return instance;
    }
})()
let a = ConfigureVals.getConfiguration({ xpoint: 8, ypoint : 9, shape : 'rectangle' }); 
console.log(a);