import connectMongoDB from "@/lib/connectMongoDB";
import UserModel, { Message } from "@/models/User";

export async function POST(request: Request) {
  await connectMongoDB();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username }).exec();

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found!",
        },
        { status: 404 }
      );
    }

    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting messages",
        },
        { status: 403 }
      );
    }

    const newMessage = { content, createdAt: new Date() };

    user.messages.push(newMessage as Message);

    await user.save();

    return Response.json(
      {
        success: true,
        message: "Sent Successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Message Sending Server Error in send messages");
    return Response.json(
      {
        success: false,
        message: "Message Sending Server Error",
      },
      { status: 500 }
    );
  }
}
