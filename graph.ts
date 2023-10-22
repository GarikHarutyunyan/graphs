class Graph {
    nodes: Set<string> = new Set();
    edges: Map<string, string[]> = new Map();

    #addNode = (nodeData:string) => {
        this.nodes.add(nodeData);
        this.edges.set(nodeData, [])
    }

    #addEdge = ([source, destination]: [string, string]) => {
        this.edges.get(source)?.push(destination);
        this.edges.get(destination)?.push(source);
    }

    constructor(nodesData: string[], edgesData: [string, string][]){
        nodesData.forEach(this.#addNode);
        edgesData.forEach(this.#addEdge);
    }

    bfs = (start: string, end: string) => {
        const queue: string[] = [start];
        const visitedNodes: Set<string> = new Set(start);
        
        while(queue.length){
            const node: string = queue[0];
            queue.shift();
            const nodeEdges: string[] = this.edges.get(node) || [];

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

    dfs = (start: string, end: string, visitedNodes: Set<string> = new Set()) => {
        visitedNodes.add(start);

        const nodeEdges: string[] = this.edges.get(start) || [];

        for(const nodeEdge of nodeEdges){
            if(nodeEdge === end){
                console.log(`${end} is found.`)
                return;
            }

            if(!visitedNodes.has(nodeEdge)){
                console.log(`${nodeEdge} is Visited.`)
                this.dfs(nodeEdge, end, visitedNodes);
            }
        };
    }

}

const nodesData: string[] = ['A', 'B', 'C', 'D', 'E','F', 'G', 'H', 'I'];
const edgesData: [string, string][] = [
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
