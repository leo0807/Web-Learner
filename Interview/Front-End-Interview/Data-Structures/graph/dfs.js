const graph = [];

const visited = new Set();
const dfs = (n) => {
    visited.add(n);
    graph[n].forEach(c => {
       if(!visited.has(c)){
           dfs(c);
       } 
    });
};