import dict from './dict';
import queue from './queue';

function Graph() {
    // 属性： 顶点 边
    this.vertexes = [];
    this.edges = new Dictionary();

    // 添加顶点的方法
    Graph.prototype.addVertex = function (v) {
        this.vertexes.push(v);
        this.edges.set(v, []);
    }
    // 添加边的方法 
    Graph.prototype.addEdge = function (v1, v2) {
        this.edges.get(v1).push(v2);
        this.edges.get(v2).push(v1);
    }

    Graph.prototype.toString = function () {
        // 定义字符串, 保存最终结果
        var resultString = "";
        // 遍历所有顶点，以及顶点对应的边
        for (var i = 0; i < this.vertexes.length; i++){
            resultString += this.vertexes[i] + '=>';
            var vEdge = this.edges.get(this.vertexes[i]);
            for (var j = 0; j < vEdge.length; j++){
                resultString += vEdge[j] + ' ';
            }
            resultString += '\n';
        }
        return resultString;
    }
    // 初始颜色 没有被访问过的为白色
    Graph.prototype.initializeColor = function () {
        var colors = [];
        for (var i = 0; i < this.vertexes.length; i++){
            colors[this.vertexes[i]] = 'white';
        }
        return colors;
    }
    // BFS
    Graph.prototype.bfs = function (initV, handler) {
        var colors = this.initializeColor();
        var queue = new Queue();
        queue.enqueue(initV);

        while (!queue.isEmpty()) {
            // 从队列取出一个顶点
            var v = queue.dqueue();
            // 获取和顶点相连的另外顶点
            var vList = this.edges.ger(v);
            colors[v] = 'gray';
            // 遍历其他所有顶点，并加入队列
            for (var i = 0; i < vList.length; i++){
                var e = vList[i];
                if (colors[e] == 'white') {
                    colors[e] = 'gray';
                    queue.enqueue(e);
                }
            }
            // 访问顶点
            handler(v);
            // 将顶点设置为黑色
            colors[v] = 'black';
        }
    }
    // dfs
    Graph.prototype.dfs = function (initV, handler) {
        var colors = this.initializeColor();
        this.dfsVisit(init, colors, handler);
    }
    Graph.prototype.dfsVisit = function (v, colors, handler) {
        colors[v] = 'gray';
        handler(v);

        var vList = this.edges.get(v);
        for (var i = 0; i < vList.length; i++){
            var e = vList[i];
            if (colors[e] == 'white') {
                this.dfsVisit(e, colors, handler)
            }
        }
        colors[v] = 'black';
    }
}