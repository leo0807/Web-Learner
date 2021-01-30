
function ArrayListener() {
  this.arr = [];
  this.props = ['push', 'pop'];

  Object.defineProperty(this, 'push', {
    get: function () {
      console.log('get');
    },
    set: function (value) {
      this.arr.push(value);
      console.log('push', value);

    }
  })
}

let arr = new ArrayListener();
arr.push(1);
// console.log(arr);
