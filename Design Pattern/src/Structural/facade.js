/**
    外观模式用于简化客户端与系统的交互。因此，当应用程序具有客户端不需要查看的庞大而复杂的底层代码时，可以使用它。
    外观模式提供了一个更简单的界面，它隐藏了系统的复杂功能。这在 jQuery 等 JavaScript 库中被广泛使用。

    外观模式允许您对客户端隐藏所有杂乱的逻辑，只向它们显示清晰且易于使用的界面。
    这允许他们以更不容易出错的方式轻松地与 API 交互，而无需直接访问内部工作。
 */

class Inventory{
  constructor(){
    this.shampoo = 20;
    this.conditioner = 20;
    this.hairSerum = 1000;  
  }
  checkInventry(product){
    let avaiable = false;
    if(product.productName === 'shampoo' && product.amount >= this.shampoo){
      avaiable = true;
    }
    if(product.productName === 'conditioner' && product.amount >= this.conditioner){
      avaiable = true;
    }
    if(product.productName === 'hair serum' && product.amount >= this.hairSerum){
      avaiable = true;
    }
    return avaiable;   
  }
}

class BuyingProduct extends Inventory {
  buyProduct(product) {
    if(!this.checkInventry(product)){
      return new BuyProduct().showDetails(product);
    }else{
      return new PreOrderProduct().showDetails(product);
    }
  }

}

class BuyProduct{
  showDetails(product){
    console.log(`${product.amount} bottles of ${product.productName} are available. Click on "buy" to purchase them.`)
  }
}

class PreOrderProduct{
  showDetails(product){
    console.log(`${product.amount} bottles of ${product.productName} are not available. You can Pre-order them on the next page.`)
  }
}