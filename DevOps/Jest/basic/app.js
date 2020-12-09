function proj1(money){
    return money >= 200?'Primum Service': 'Basic Service'  
}
function proj2(money){
    return money >= 1000?'Double Service': 'Single Service'  
}

module.exports = {proj1, proj2};

// 单元测试 =》 模块测试 unit test 
// 集成测试