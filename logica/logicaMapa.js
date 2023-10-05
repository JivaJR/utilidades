export function verificarcontinuidad(vector){
    var polylines=[]
    var newVector=[]
    var lastcond=[]
    var conds=[]
    for (let pos of vector){
        if(lastcond.length==0){
            lastcond=pos
        }
        conds=[
            (Math.abs((pos[0]-lastcond[0])/pos[0]))*100000,
            (Math.abs((pos[1]-lastcond[1])/pos[1]))*100000
        ]
        if (conds[0]>20 || conds[1]>20){
            polylines.push(newVector)
            newVector=[]
            newVector.push(pos)
            lastcond=pos
        }else if( conds[0]<2 && conds[1]<2){
            lastcond=pos
        }else{
            newVector.push(pos)
            lastcond=pos
        }
    }
    polylines.push(newVector)
    return polylines
}

export function isInCircle(vectorCircle,circle){
    const {lat,lng} = circle
    var inCircle=[]
    for(let pos of vectorCircle){
        if(
            lat >= pos[0] - 0.0018 &&
            lat <= pos[0] + 0.0018 &&
            lng >= pos[1] - 0.0018 &&
            lng <= pos[1] + 0.0018
        ){
            inCircle.push(pos)
        }
        
    }
    console.log(inCircle)
    return inCircle
}
    export const limeOptions = {color:'lime'}
    export const fillBlueOptions = { fillColor: 'blue' }
    export const redOptions = { color: 'red'}