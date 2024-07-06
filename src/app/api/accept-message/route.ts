import connectMongoDB from "@/lib/connectMongoDB";
import UserModel from "@/models/User";
import { authOptions } from "../auth/[...nextauth]/options";
import { User, getServerSession } from "next-auth";

export async function POST(request: Request) {
  await connectMongoDB();

  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  const userId = user._id;
  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessages },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "Failed to update user status",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message accepted and status updated success",
        updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to update user status to accept messages");

    return Response.json(
      {
        success: false,
        message: "Failed to update user status",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  await connectMongoDB();

  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  // const userId = user._id;

  try {
    const foundUser = await UserModel.findById(user._id);

    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User Not Found 404",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessage,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Failed to get the message" + error.message);
    return Response.json(
      {
        success: false,
        message: "Error in getting Message",
      },
      { status: 500 }
    );
  }
}
