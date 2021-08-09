
let arr = [
  {
    id: 1,
    pid: 0,
    name: 'body'
  },
  {
    id: 2,
    pid: 1,
    name: 'title'
  },
  {
    id: 3,
    pid: 1,
    name: 'div'
  },
  {
    id: 4,
    pid: 3,
    name: 'span'
  },
  {
    id: 5,
    pid: 3,
    name: 'icon'
  },
  {
    id: 6,
    pid: 4,
    name: 'subspan'
  }
];

function listToTree(list) {
  var map = {}, node, tree = [], i;
  for (i = 0; i < list.length; i++) {
    map[list[i].id] = list[i];
    list[i].children = [];
  }
  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.pid) {
      map[node.pid].children.push(node);
    } else {
      tree.push(node);
    }
  }
  console.log(tree);
  return tree;
}
listToTree(arr);


function isCicleReference(obj) {
  for (let i in obj) {
    if (typeof obj[i] === 'object') {
      if (obj[i] === obj) {
        return true;
      } else {
        if (isCicleReference(obj[i])) {
          return true;
        }
      }
    }
  }
  return false;
}