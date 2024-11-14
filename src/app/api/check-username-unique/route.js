import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { z } from "zod";
import { usernamevalidation } from "@/Schemas/SignUpSchema";

const UsernameQuerySchema = z.object({
    username: usernamevalidation,
});

export async function GET(request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const queryParams = {
            username: searchParams.get('username'),
        };

        const result = UsernameQuerySchema.safeParse(queryParams);

        if (!result.success) {
            const usernameError = result.error.format().username?._errors || [];

            return Response.json(
                {
                    success: false,
                    message:
                        usernameError?.length > 0
                            ? usernameError.join(', ')
                            : 'Invalid Query parameter'
                },
                { status: 400 }
            )
        }
        console.log(queryParams.username)
        const existingVarifiedUser = await User.findOne({
            username : queryParams.username,
            isVerified: true,
        })

        if (existingVarifiedUser) {
            return Response.json(
                {
                    success: false,
                    message: 'Username already exists',
                }
                ,
                { status: 200 }
            );
        }

        return Response.json(
            {
                success : true,
                message : "Username is unique" 
            },
            {status: 200}
        );

    } catch (error) {
        console.error("Error checking username: ", error);
        return Response.json(
            {
                success: false,
                message: 'Error checking username',
            },
            { status: 500 }
        );
    }
}