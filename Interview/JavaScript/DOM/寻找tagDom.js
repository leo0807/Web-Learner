let root = document.documentElement; //HTML
let obj = {};

function traveseDom(root) {
    let children = root.children;
    for (let i = 0, len = children.length; i < len; i++) {
        let child = children[i];
        let name = child.nodeName;
        let pattern = new RegExp(/^h\w*\d*/i)
        if (pattern.test(name)) {
            if (obj[name]) {
                obj[name] += 1;
            } else {
                obj[name] = 1;
            }
        }
        child.children && traveseDom(child);
    }
}
traveseDom(root)