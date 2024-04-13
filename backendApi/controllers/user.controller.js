import AppError from "../utils/errors.utils";

// register
const register = async (req, res, next) => {
  try {
    // Extract user data from the request body
    const { fullName, email, password } = req.body;

    // Check if the required fields are provided
    if (!fullName || !email || !password) {
      return next(new AppError("All fields are required.", 400));
    }

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError("All fields are required.", 400));
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record in the database
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      avatar: {
        public_id: email,
        secure_url:
          "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg",
      },
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with the newly created user's information
    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: {
        fullName: newUser.fullName,
        email: newUser.email,
        // Do not return the password
      },
    });
  } catch (error) {
    // Pass errors to the error handling middleware
    next(error);
  }
};

// login
const login = () => {};
// logout
const logout = () => {};

// get my profile
const getProfile = () => {};
export { register, login, logout, getProfile };
