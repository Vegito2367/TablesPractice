"use server"
export async function MathEngine(props){
    let status=400;
    let response="Math failed";
    console.log(props)
    
    return {status: 200, response: "Math successful"}
}


//Potentially implement a math engine here