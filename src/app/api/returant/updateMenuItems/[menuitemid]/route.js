import dbConnect from "@/lib/dbConnect";
import MenuItem from "@/models/MenuItemModel";
import { getToken } from "next-auth/jwt";

//Patch Api
export async function PATCH(req, { params }) {

    const { menuitemid } = params;

    if (!menuitemid) {
        return Response.json(
            {
                success: false,
                message: "Item id is required"
            },
            { status: 400 }
        )
    }

    try {

        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });
        // console.log('Decoded Token:', token.sub);
        if (!token) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Unauthorized: Invalid token',
                }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const { name, price, description, category, image, available } = await req.json();

        await dbConnect();
        const updatedItem = await MenuItem.findByIdAndUpdate(
            menuitemid,
            {
                ...(price && { price }), ...(name && { name }), ...(description && { description }),
                ...(category && { category }), ...(image && { image }), ...(available && { available })
            },
            { new: true } // Return the updated document
        );

        if (!updatedItem) {
            return Response.json(
                {
                    success: false,
                    message: "Menu item not found or could not be updated",
                },
                { status: 404 }
            )
        }

        return Response.json(
            {
                success: true,
                message: "Menu item updated successfully",
                data: updatedItem,
            },
            { status: 200 }
        )


    } catch (error) {
        console.log("Error upadting menu: ", error);
        return Response.json(
            {
                success: false,
                message: "Error updating menu"
            },
            { status: 500 }
        )
    }

}

//Delete Api
export async function DELETE(req, { params }) {

    const { menuitemid } = params;

    if (!menuitemid) {
        return Response.json(
            {
                success: false,
                message: "Item id is required"
            },
            { status: 400 }
        )
    }

    try {

        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });

        if (!token) {
            return Response.json(
                {
                    success: false,
                    message: "Unauthorized: Invalid token"
                },
                { status: 401 }
            )
          
        }

        await dbConnect();

        const deletedItem = await MenuItem.findByIdAndDelete(menuitemid);

        if (!deletedItem) {
            return Response.json(
                {
                    success: false,
                    message: "Menu item not found"
                },
                { status: 404 }
            )
        }

        return Response.json(
            {
                success: false,
                message: "Menu item deleted successfully"
            },
            { status: 200 }
        )

    } catch (error) {
        console.log("Error Deleting item: ", error);

        return Response.json(
            {
                success: false,
                message: "Error Deleting Item"
            },
            { status: 500 }
        )
    }
}