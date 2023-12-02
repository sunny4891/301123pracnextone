import { ObjectId } from "mongodb";
import { connectDB } from "../../../../lib/db";

export async function GET(req) {
  const searchParams = req?.nextUrl?.searchParams;
  const _id = searchParams?.get("stockNameId");
  const db = await connectDB();
  const collection = db.collection("stockPrice");
  const data = await collection.find({}).toArray();
  if (!_id) {
    return Response.json(data);
  }
  const result = await collection.findOne({ _id: new ObjectId(_id) });
  return Response.json({ result });
}

function stockPrice(max, min) {
  return (Math.random(0, 1) * (max - min) + min).toFixed(2);
}
