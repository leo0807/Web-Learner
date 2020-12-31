/*
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */

/**
 * 
 * @param head TreeNode类 
 * @return int整型
 */
function nodeNum( head ) {
    // write code here
    if(!head) return 0;
    let lHeight = getHeight(head),
        rHeight = 1;
    if(head.right != null){
        let tmp = head.right;
        rHeight++;
        while(tmp.left != null){
            tmp = tmp.left;
            rHeight++;
        }
    }
    if(lHeight === rHeight){
        return Math.pow(2, lHeight - 1) + nodeNum(head.right);
    }else{
        return Math.pow(2, rHeight - 1) + nodeNum(head.left);
    }

}
function getHeight(node){
    return node == null? 0: getHeight(node.left) + 1;
}
module.exports = {
    nodeNum : nodeNum
};