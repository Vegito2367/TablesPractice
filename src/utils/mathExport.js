import MathEngine from './math';

const mathEngineInstances = new Map();  // Stores instances per attempt slug

export async function createEngine(slug,cons){
    if(mathEngineInstances.has(slug)){
        mathEngineInstances.delete(slug);
        mathEngineInstances.set(attemptSlug, new MathEngine(attemptSlug,cons));
    }
    return "Engine succesfully created"
}
export async function getMathEngine(attemptSlug) {
    if (!mathEngineInstances.has(attemptSlug)) {
        return "No engine found";
        
    }
    return mathEngineInstances.get(attemptSlug);
}

export async function deleteMathEngine(attemptSlug) {
    mathEngineInstances.delete(attemptSlug);
    return "Engine deleted successfully";
}
