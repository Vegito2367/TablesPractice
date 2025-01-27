import MathEngine from './math';



const mathEngineInstances = new Map();  // Stores instances per attempt slug

export async function createEngine(slug,cons){
    try{
        if(mathEngineInstances.has(slug)){
            mathEngineInstances.delete(slug);
        }
        
        mathEngineInstances.set(slug, new MathEngine(slug,cons));
        
        return {message: "Engine succesfully created", verification: mathEngineInstances.get(slug).toString()};
    }
    catch(e){
        console.log(e);
        return {status:500, response: "Status 500: check console"};
    }
    
}
export async function getMathEngine(attemptSlug) {
    console.log(mathEngineInstances)
    try{
        if (!mathEngineInstances.has(attemptSlug)) {

            return {message: "Engine not found - Try reloading dashboard and try again", object: null};
        }
        const engine = mathEngineInstances.get(attemptSlug);
        return {message: "Engine found", object: engine};
    }
    
    catch(e){
        
        console.log(e);
        return {status:500, response: "Status 500: check console"};
    }
}
    

export async function deleteMathEngine(attemptSlug) {
    mathEngineInstances.delete(attemptSlug);
    return "Engine deleted successfully";
}
