

export function POST({ request }) {
    console.log(request)


    const res = await request.json();

    console.log(res)



    return new Response(res);
}