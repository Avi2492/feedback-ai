import connectMongoDB from "@/lib/connectMongoDB";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await connectMongoDB();

  try {
    const { username, email, password } = await request.json();

    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      return Response.json(
        { success: false, message: "Username is Already Taken" },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      true;
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const expiryDate = new Date();

      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });

      await newUser.save();
    }

    //   Send Verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        {
          status: 500,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "User Registered SUcccess. Please verify your mail",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in registering user in Signup route", error);

    return Response.json(
      {
        success: false,
        message: "Error Registering User",
      },
      { status: 500 }
    );
  }
}
