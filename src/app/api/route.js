function data() {
  return "Prasenjit Saha";
}

export async function POST(req) {
  //   console.log(request);
  let { name } = await req.json();
  return Response.json({ data: name });
}
