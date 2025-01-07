import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/models/OrderModel";
import { getToken } from "next-auth/jwt";


export async function PATCH(req, { params }) {
    const { orderid } = params;
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


        const body = await req.json();
        const { status } = body;

        if (!status || !["pending", "accepted", "in-progress", "delivered", "cancelled"].includes(status)) {
            return Response.json(
                {
                    success: false,
                    message: "Invalid status"
                },
                { status: 400 }
            )
        }

        await dbConnect();

        const order = await OrderModel.findById(orderid);

        if (!order) {
            return Response.json(
                {
                    success: false,
                    message: "Order not found"
                },
                { status: 403 }
            )
        }

        if (token.sub !== order.restaurantId.toString() && !token.isAdmin) {
            return Response.json(
                {
                    success: false,
                    message: "Forbidden: You are not authorized to update this order"
                },
                { status: 403 }
            )
        }

        order.status = status;
        await order.save();

        return Response.json(
            {
                success: true,
                message: "Order status updated successfully",
                data: order
            },
            {status: 200}
        );


    } catch (error) {
        console.log("Error Updating status: ", error);
        return Response.json(
            {
                success: false,
                message: "Error Updating status"
            },
            { status: 500 }
        )
    }
}