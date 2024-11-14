import dbConnect from '@/lib/dbConnect';
import Restaurant from '@/models/Restaurant';
import User from '@/models/User';

export async function POST(request) {
  // Connect to the database
  await dbConnect();

  try {
    const { username, code, role } = await request.json();
    const decodedUsername = decodeURIComponent(username);

    // Check role and find the appropriate entity (User or Restaurant)
    let account;
    if (role === 'user') {
      account = await User.findOne({ username: decodedUsername });
    } else if (role === 'restaurant') {
      account = await Restaurant.findOne({ username: decodedUsername });
    } else {
      return Response.json(
        { success: false, message: 'Invalid role' },
        { status: 400 }
      );
    }

    // Check if account (user or restaurant) exists
    if (!account) {
      return Response.json(
        { success: false, message: `${role} not found` },
        { status: 404 }
      );
    }

    // Check if the code is correct and not expired
    const isCodeValid = account.verifyCode === code;
    const isCodeNotExpired = new Date(account.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      // Update the account's verification status
      account.isVerified = true;
      await account.save();

      return Response.json(
        {
          success: true,
          message: `${role} account verified successfully`
        },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      // Code has expired
      return Response.json(
        {
          success: false,
          message: 'Verification code has expired. Please sign up again to get a new code.',
        },
        { status: 400 }
      );
    } else {
      // Code is incorrect
      return Response.json(
        { success: false, message: 'Incorrect verification code' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error verifying account:', error);
    return Response.json(
      { success: false, message: 'Error verifying account' },
      { status: 500 }
    );
  }
}
