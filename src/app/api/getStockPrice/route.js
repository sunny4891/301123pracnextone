export async function GET(req) {
  const searchParams = req?.nextUrl?.searchParams;
  const name = searchParams?.get("stock_name");
  const data = await database();
  if (!name) {
    return Response.json(data);
  }
  const result = data.filter(
    (e) => e.stock.toLowerCase() == name.toLowerCase()
  );
  return Response.json(result?.[0]);
}

function stockPrice(max, min) {
  return (Math.random(0, 1) * (max - min) + min).toFixed(2);
}

function database() {
  return [
    {
      stock: "idfc",
      price: parseFloat(stockPrice(126, 124)),
    },
    {
      stock: "sbi",
      price: parseFloat(stockPrice(424, 436)),
    },
    {
      stock: "yesbank",
      price: parseFloat(stockPrice(200, 210)),
    },
  ];
}
