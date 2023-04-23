 ## Red-Black Tree 红黑树
 <hr />
 
 ### 定义 Concept
 - Every node is red or black
 - Root is always black
 - New insertions are always red
 - Every path from root to leaf has the number of `BLACK` nodes
 - No path can have consecutive `RED` nodes
 - Nulls(Nil) are black
 
### Rebalance
- Black Aunt -> Rotate 
- Red Anut -> Colorflip
