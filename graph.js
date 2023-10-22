class Graph {
    nodes = new Set();
    edges = new Map();

    #addNode = (nodeData) => {
        this.nodes.add(nodeData);
        this.edges.set(nodeData, [])
    }

    #addEdge = ([source, destination]) => {
        this.edges.get(source).push(destination);
        this.edges.get(destination).push(source);
    }

    constructor(nodesData, edgesData){
        nodesData.forEach(this.#addNode);
        edgesData.forEach(this.#addEdge);
    }

    bfs = (start, end) => {
        const queue = [start];
        const visitedNodes = new Set(start);
        
        while(queue.length){
            const node = queue.shift();
            const nodeEdges = this.edges.get(node);

            for(const nodeEdge of nodeEdges){
                if(nodeEdge === end){
                    console.log(`${end} is found.`)
                    return;
                }

                if(!visitedNodes.has(nodeEdge)){
                    visitedNodes.add(nodeEdge);
                    queue.push(nodeEdge);
                    console.log(`${nodeEdge} is Visited.`)
                }
            };
        }
    }

    dfs = (start, end, visitedNodes = new Set(), isFound = false) => {
        visitedNodes.add(start);

        const nodeEdges = this.edges.get(start);

        for(const nodeEdge of nodeEdges){
            if(nodeEdge === end){
                console.log(`${end} is found.`)
                return;
            }

            if(!visitedNodes.has(nodeEdge)){
                console.log(`${nodeEdge} is Visited.`)
                this.dfs(nodeEdge, end, visitedNodes, isFound);
            }
        };
    }

}

const nodesData = ['A', 'B', 'C', 'D', 'E','F', 'G', 'H', 'I'];
const edgesData = [
    ['A','B'],
    ['A','C'],
    ['A','D'],
    ['A','E'],
    ['B','F'],
    ['C','D'],
    ['E','G'],
    ['F','H'],
    ['G','H'],
    ['G','I'],
    ['H','I'],
];

const G1 = new Graph(nodesData, edgesData);

G1.bfs('A', 'I')
G1.dfs('A', 'I')
