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

    testFunction(){
        return {status:200, response: "Test function working"}
    }

    generateQuestions(questionType){
        const ll=this.constraints[questionType].lowerLimit;
        const ul=this.constraints[questionType].upperLimit;

        switch(questionType){
            case "addition":
                return this.generateType1(ll,ul);
            case "subtraction":
                return this.generateType2(ll,ul);
            case "multiplication":
                return this.generateType3(ll,ul);
            case "division":
                return this.generateType4(ll,ul);
        }
    }

    generateAdditionQuestion(ll,ul){
        const a=Math.floor(Math.random()*(ul-ll+1)+ll);
        const b=Math.floor(Math.random()*(ul-ll+1)+ll);
        return {opA:a,opB:b,answer:a+b};
    }

    generateSubtractionQuestion(ll,ul){
        const a=Math.floor(Math.random()*(ul-ll+1)+ll);
        const b=Math.floor(Math.random()*(ul-ll+1)+ll);
        return {opA:a,opB:b,answer:a-b};
    }

    generateMultiplicationQuestion(ll,ul){
        const a = Math.floor(Math.random()*(ul-ll+1)+ll);
        const b = Math.floor(Math.random()*(9-2+1)+2);
        return {opA:a,opB:b,answer:a*b};
    }
    generateDivisionQuestion(ll,ul){
        const {opA,opB,answer}=this.generateMultiplicationQuestion(ll,ul);
        return {opA: answer, opB: opB, answer: opA};
    }

}