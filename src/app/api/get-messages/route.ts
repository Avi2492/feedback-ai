import connectMongoDB from "@/lib/connectMongoDB";
import { User, getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";
import UserModel from "@/models/User";

export async function GET(request: Request) {
  await connectMongoDB();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const user = await UserModel.aggregate([
      {
        $match: { id: userId },
      },
      {
        $unwind: "$messages",
      },
      {
        $sort: { "messages.createdAt": -1 },
      },
      {
        $group: { _id: "$_id", messages: { $push: "$messages" } },
      },
    ]);

    if (!user || user.length === 0) {
      return Response.json(
        {
          success: false,
          message: "User not found!",
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        messages: user[0].messages,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: "Error in Get message route" + error.message,
      },
      { status: 500 }
    );
  }
}
