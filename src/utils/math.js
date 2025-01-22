export default class MathEngine {
    constructor(attemptSlug,props) {
        this.constraints=props;
        this.attemptSlug=attemptSlug;
        this.questions=[];
        this.types=[]
        for (const questionType in this.constraints){
            this.types.push(questionType);
        }
    }

    get getTypes(){
        return this.types;
    }

}

//Potentially implement a math engine here