import connectMongoDB from "@/lib/connectMongoDB";
import UserModel from "@/models/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  // Check to handle post resquest use this in all other routes
  // if (request.method !== "GET") {
  //   return Response.json(
  //     {
  //       success: false,
  //       message: "Only Get Request allowed",
  //     },
  //     { status: 405 }
  //   );
  // }

  await connectMongoDB();

  try {
    const { searchParams } = new URL(request.url);

    const queryParams = {
      username: searchParams.get("username"),
    };

    const result = UsernameQuerySchema.safeParse(queryParams);

    // console.log(result);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];

      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(", ")
              : "Invalid query parameters",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username is Already taken!",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is unique!",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return Response.json(
      {
        success: false,
        message: "Error Checking Username!",
      },
      {
        status: 500,
      }
    );
  }
}
