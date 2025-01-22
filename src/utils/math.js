export default class MathEngine {
    constructor(attemptSlug,props) {
        this.constraints=props;
        this.attemptSlug=attemptSlug;
        this.questions=[];
        this.types=[]
        for (const questionType in this.constraints){
            if(this.constraints[questionType].include){
                this.types.push(questionType);
            }
            
        }
    }

    getTypes(){
        return this.types;
    }

    toString(){
        return `Math Engine for attempt ${this.attemptSlug}`
    }

}

//Potentially implement a math engine here