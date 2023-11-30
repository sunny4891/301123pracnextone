export async function GET(req) {
  const searchParams = await req?.nextUrl?.searchParams;
  const name = searchParams?.get("stock_name");
  const max = 126;
  const min = 124;
  const stock_price = (Math.random(0, 1) * (max - min) + min).toFixed(2);
  const data = [
    {
      stock: "idfc",
      price: parseFloat(stock_price),
    },
    {
      stock: "sbi",
      price: 424.26,
    },
    {
      stock: "yesbank",
      price: 200.75,
    },
  ];

  if (!name) {
    return Response.json(data);
  }

  const result = data.filter(
    (e) => e.stock.toLowerCase() == name.toLowerCase()
  );

  return Response.json(result?.[0]);
}
