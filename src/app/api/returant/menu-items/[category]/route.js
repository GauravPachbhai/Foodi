import dbConnect from "@/lib/dbConnect";
import MenuItem from "@/models/MenuItemModel";

export async function GET(request, { params }) {
    // console.log("Params:", params); // Debug log to inspect params
    const { category } = params; // Extract the category from params

    if (!category) {
        return Response.json(
            {
                success: false,
                message: "Category is required",
            },
            { status: 400 }
        );
    }

    try {
        await dbConnect();

        const menuItems = await MenuItem.find({ category, available: true });

        if (!menuItems || menuItems.length === 0) {

            return Response.json(
                {
                    success: false,
                    message: "No items found for this category",
                },
                { status: 404 }
            )
           
        }

        return Response.json(
            {
                success: true,
                message: "Items fetched successfully",
                data: menuItems
            },
            { status: 200 }
        )
       
    } catch (error) {
        console.error("Error Fetch menu Items:", error);

        return Response.json(
            {
                success: false,
                message: "Error Fetching menu Items",
            },
            { status: 200 }
        )
        
    }
}
