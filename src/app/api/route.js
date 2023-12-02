function data() {
  return "Prasenjit Saha";
}

export async function GET(req) {
  //   console.log(request);
  return Response.json({ data: "Prasenjit Saha" });
}
