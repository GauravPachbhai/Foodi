import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/models/OrderModel";
import { getToken } from "next-auth/jwt";

//Post order
export async function POST(req) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });
    // console.log('Decoded Token:', token.sub);
    if (!token) {
        return Response.json(
            {
                success: false,
                message: 'Unauthorized: Invalid token',
            },
            { status: 401, headers: { 'Content-Type': 'application/json' } }
        );

    }

    try {

        const body = await req.json();

        const { userId, restaurantId, menuItems, totalAmount } = body;

        if (!userId || !restaurantId || !menuItems || !totalAmount) {
            return Response.json(
                {
                    success: false,
                    message: "All fields are required"
                },
                { status: 400 }
            );
        }

        await dbConnect();

        const newOrder = await Order.create({ userId, restaurantId, menuItems, totalAmount });

        return Response.json(
            {
                success: true,
                message: "Order placed successfully",
                data: newOrder
            },
            { status: 200 }
        )


    } catch (error) {
        console("Error Placing order: ", error)

        return Response.json(
            {
                success: false,
                message: "Error Placing order"
            },
            { status: 500 }
        )
    }
}

//GET all the orders for user or resturants
export async function GET(req) {


    try {
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });
        // console.log('Decoded Token:', token.sub);
        if (!token) {
            return Response.json(
                {
                    success: false,
                    message: 'Unauthorized: Invalid token',
                },
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );

        }

        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        const restaurantId = searchParams.get("restaurantId");

        if (!userId || !restaurantId) {
            return Response.json(
                {
                    success: false,
                    message: "Provide userId or restaurantId"
                },
                { status: 400 }
            )
        }
        await dbConnect();

        const orders = await OrderModel.find({
            ...(userId && { userId }),
            ...(restaurantId && { restaurantId }),
        });


        return Response.json(
            {
                success: true,
                message: "Orders Detaails fetched successfully",
                data: orders
            },
            { status: 200 }
        )

    } catch (error) {
        console.log("Error fetching orders: ", error);
        return Response.json(
            {
                success: false,
                message: "Error fetching orders"
            },
            { status: 500 }
        )
    }

}