import connectMongoDB from "@/lib/connectMongoDB";
import { User, getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";
import UserModel from "@/models/User";

export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } }
) {
  const messageId = params.messageid;
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
    const deleteMessage = await UserModel.updateOne(
      { _id: userId },
      {
        $pull: { messages: { _id: messageId } },
      }
    );

    if (deleteMessage.modifiedCount === 0) {
      return Response.json(
        {
          success: false,
          message: "Message not found or Already Deleted",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message Deleted Success!",
      },
      { status: 401 }
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: "Error in Delete message route" + error.message,
      },
      { status: 500 }
    );
  }
}
