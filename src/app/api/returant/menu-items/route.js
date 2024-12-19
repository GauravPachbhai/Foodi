import { getToken } from 'next-auth/jwt';
import dbConnect from '@/lib/dbConnect';
import MenuItem from '@/models/MenuItemModel';

export async function POST(req) {
  try {
    // Extract the Bearer token from the Authorization header
    // const authHeader = req.headers.get('authorization');
    // const bearerToken = authHeader?.split(' ')[1]; 

    // if (!bearerToken) {
    //   return new Response(
    //     JSON.stringify({
    //       success: false,
    //       message: 'Authorization token is missing',
    //     }),
    //     { status: 401, headers: { 'Content-Type': 'application/json' } }
    //   );
    // }

    // Get the token using NextAuth's getToken to verify and decode it
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

    // Extract restaurant ID from the decoded token
    const restaurantId = token.sub;

    if (!restaurantId) {
      return Response.json(
        {
          success: false,
          message: 'Restaurant ID is missing in token',
        },
        { status: 400 }
      );
      
    }

    // Connect to the database
    await dbConnect();

    // Parse the request body
    const { name, price, description, category, image, available } = await req.json();

    // Check for existing menu item
    const existingMenuItem = await MenuItem.findOne({
      name,
      category,
      restaurantId,
    });

    if (existingMenuItem) {
      return Response.json(
        {
          success: false,
          message: 'Menu item already exists',
        },
        { status: 400 }
      );
     
    }

    // Create new menu item
    const newMenuItem = new MenuItem({
      name,
      price,
      description,
      category,
      image,
      available,
      restaurantId,
    });

    await newMenuItem.save();

    return Response.json(
      {
        success: true,
        message: 'Menu item added successfully',
        data:newMenuItem
      },
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error Adding Menu Item:', error.message);

    return Response.json(
      {
        success: false,
        message: 'Error adding menu item',
      },
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  
  }
}
