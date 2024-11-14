import dbConnect from "@/lib/dbConnect";
import bcrypt from 'bcryptjs';
import Restaurant from "@/models/Restaurant";
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";

export async function POST(req, res) {

    try {
        await dbConnect();
        const { username, email, password, restaurantName, phoneNumber, address, city, country, role, } = await req.json();

        //cheack Username Already Exist or taken
        const existingVerifiedResturantUsername = await Restaurant.findOne({
            username,
            isVerified: true
        });
        // console.log(existingVerifiedResturantUsername)
        if (existingVerifiedResturantUsername) {
            return Response.json(
                {
                    success: false,
                    message: "resturant Username already exist"
                },
                { status: 400 })
        }

        const existingResturantByEmail = await Restaurant.findOne({ email });
        let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        if (existingResturantByEmail) {
            if (existingResturantByEmail.isVerified) {
                return Response.json(
                    {
                        success: false,
                        message: "Resturant Already Exist with this email",
                    },
                    { status: 400 }
                )
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingResturantByEmail.password = hashedPassword;
                existingResturantByEmail.verifyCode = verifyCode;
                existingResturantByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingResturantByEmail.save();
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newResturant = new Restaurant({
                username,
                email,
                password: hashedPassword,
                restaurantName,
                phoneNumber,
                address,
                city,
                country,
                role,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
            })
            await newResturant.save();
        }

        // Send verification email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode,
   
        );

        if (!emailResponse.success) {
            return Response.json(
              {
                success: false,
                message: emailResponse.message,
              },
              { status: 500 }
            );
          }
      
          return Response.json(
            {
              success: true,
              message: 'Resturant registered successfully. Please verify your account.',
            },
            { status: 201 }
          )


    } catch (error) {
        console.error("Error Registering Resturant: ", error)
        return Response.json(
            {
                success: false,
                message: 'Error registering resturant',
            },
            { status: 500 }
        );
    }
}