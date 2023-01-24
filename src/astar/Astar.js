function Astar(startNode,endNode){
    let openSet = []
    let closedSet = []
    let path = []
    let visitedNodes = [];

    openSet.push(startNode)

    while(openSet.length > 0){
        let leastIndex = 0;
        for(let i = 0; i < openSet.length; i++){
            if(openSet[i].f < openSet[leastIndex].f){
                leastIndex = i;
            }
        }
        let current = openSet[leastIndex]
        visitedNodes.push(current);
        if(current.isEqual(endNode)){
            let temp = current;
            path.push(temp);
            while(temp.previous){
                path.push(temp.previous);
                temp = temp.previous;
            }
            return {path, visitedNodes}
        }
        openSet = openSet.filter(el => el !== current)
        closedSet.push(current)
        let neighbors = current.neighbors;
        for(let i = 0; i < neighbors.length; i++){
            let neighbor = neighbors[i];
            if(!closedSet.includes(neighbor)  && !neighbor.isWall){
                let tempG = current.g + 1
                let newPath = false;
                if(openSet.includes(neighbor)){
                    if(tempG < neighbor.g){
                        neighbor.g = tempG;
                        newPath = true;
                    } 
                }else{
                    newPath = true;
                    openSet.push(neighbor);
                }
                if(newPath){
                    neighbor.g = tempG;
                    neighbor.h = heruistic(neighbor, endNode);
                    neighbor.f = neighbor.h + neighbor.g;
                    neighbor.previous = current;
                }
            }
        }
    }
    return {path, visitedNodes, error:"No Path Found"}
}

const heruistic = (a,b) => {
    let d = Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y))
    return d;
}

export default Astar;
