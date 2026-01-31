export const getRevisionLimit = (problemCount)=>{
        if(problemCount<=10)return 0;
        if(problemCount>10 && problemCount<=20)return 1;
        if(problemCount>20 && problemCount<=50)return 2;
        if(problemCount>50 && problemCount<=90)return 3;
        if(problemCount>90 && problemCount<=120)return 4;
        if(problemCount>120)return 5;
}

export const selectProblems = (problems,limit) => {
    const result = [];
    
    let usedTopics = new Set();

    for(const p  of problems){
        
        if(!usedTopics.has(p.problemId.topic)){
            usedTopics.add(p.problemId.topic);
            result.push(p);
            if(result.length===limit)break;
        }
    }
    if(result.length<limit){
        for(const p of problems){
            if(result.length===limit)break;
            if(!result.includes(p)){
                result.push(p);
            }
        }
    }

    return result;
}