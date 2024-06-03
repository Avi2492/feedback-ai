import connectMongoDB from "@/lib/connectMongoDB";
import UserModel from "@/models/User";

export async function POST(request: Request) {
  await connectMongoDB();

  try {
    const { username, code } = await request.json();

    const decodedUsername = decodeURIComponent(username);

    const user = await UserModel.findOne({ username: decodedUsername });

    console.log(user);

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found!",
        },
        { status: 400 }
      );
    }

    const isCodeValid = user.verifyCode === code;

    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        {
          success: true,
          message: "Account verfied success!",
        },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message: "Verification Code has expired, Please Signup again!",
        },
        { status: 400 }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Verification code wrong!",
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.log(error.message);
    return Response.json(
      {
        success: false,
        message: "Error verifying user!",
      },
      { status: 500 }
    );
  }
}
