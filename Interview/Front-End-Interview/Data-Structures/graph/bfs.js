const graph = [];
const startPoint = 2;
const visited = new Set(startPoint);
visited.add(2);
const q = [2];
while(q){
    const n = q.shift();
    graph[n].forEach(c => {
        if(!visited.has(c)){
            q.push(c);
            visited.add(c);
        }
    });
}