export async function GET (request) {
    const body = await request.json();
    
    return Response.json(question);
}