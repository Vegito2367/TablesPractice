import { createClient } from "@/utils/server";
import { NextResponse } from "next/server";
export async function POST(request) {
    const body = await request.json();
    const supabase = await createClient();
    if (body.type === "attempt") {
        const attemptData = body.payload
        const { status, error } = await supabase
            .from("Attempts")
            .insert({
                id: attemptData.id,
                created_at: attemptData.createdAt,
                total_questions: attemptData.totalQuestions,
                user_id: attemptData.userID,
            })
        
        console.log("Attempt",status, error)
        if(status>=200 && status<300){
            return NextResponse.json({status: 200, response: "Attempt created successfully"})
        }
        else{
            return NextResponse.json({status: 400, response: "Error creating attempt"})
        }
    }
    else if(body.type === "question"){
        const questionData = body.payload
        console.log("Question",status, error)
        const { status, error } = await supabase
            .from("Questions")
            .insert({
                id: questionData.id,
                operand: questionData.operand,
                operand_a: questionData.operandA,
                operand_b: questionData.operandB,
                correct_ans: questionData.correctAns,
                user_ans: questionData.userAns,
                attempt_id: questionData.attemptID,
            })

        if(status>=200 && status<300){
            return NextResponse.json({status: 200, response: "Question created successfully"})
        }
        else{
           return NextResponse.json({status: 400, response: error})
        }

    }
    else{
        return NextResponse.json({status: 500, response: "Invalid request type"})
    }
}