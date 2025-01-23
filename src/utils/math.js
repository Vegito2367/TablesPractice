export default class MathEngine {
    constructor(attemptSlug, props) {
        this.constraints = props;
        this.attemptSlug = attemptSlug;
        this.questions = [];
        this.types = []
        for (const questionType in this.constraints) {
            if (this.constraints[questionType].include) {
                this.types.push(questionType);
            }

        }
    }

    getTypes() {
        return this.types;
    }

    toString() {
        return `Math Engine for attempt ${this.attemptSlug}`
    }

    testFunction() {
        return { status: 200, response: "Test function working" }
    }

    generateQuestion(questionType) {
        try {
            const ll = this.constraints[questionType].lowerLimit;
            const ul = this.constraints[questionType].upperLimit;
            let question = {}
            switch (questionType) {
                case "addition":
                    question = this.generateAdditionQuestion(ll, ul);
                    break;
                case "subtraction":
                    question = this.generateSubtractionQuestion(ll, ul);
                    break;
                case "multiplication":
                    question = this.generateMultiplicationQuestion(ll, ul);
                    break;
                case "division":
                    question = this.generateDivisionQuestion(ll, ul);
                    break;
                default:
                    return { status: 404, response: "Question type not found" }
            }
            return { status: 200, response: question };
        }
        catch(e){
            console.log(e);
            return {status:400, response: "Unknown Error occured!"};
        }
        
        
    }

    generateAdditionQuestion(ll, ul) {
        const a = Math.floor(Math.random() * (ul - ll + 1) + ll);
        const b = Math.floor(Math.random() * (ul - ll + 1) + ll);
        return { opA: a, opB: b, answer: a + b, symbol: "+" };
    }

    generateSubtractionQuestion(ll, ul) {
        const a = Math.floor(Math.random() * (ul - ll + 1) + ll);
        const b = Math.floor(Math.random() * (ul - ll + 1) + ll);
        return { opA: a, opB: b, answer: a - b, symbol: "-" };
    }

    generateMultiplicationQuestion(ll, ul) {
        const a = Math.floor(Math.random() * (ul - ll + 1) + ll);
        const b = Math.floor(Math.random() * (9 - 2 + 1) + 2);
        return { opA: a, opB: b, answer: a * b, symbol: "*" };
    }
    generateDivisionQuestion(ll, ul) {
        const { opA, opB, answer } = this.generateMultiplicationQuestion(ll, ul);
        return { opA: answer, opB: opB, answer: opA, symbol: "/" };
    }

}