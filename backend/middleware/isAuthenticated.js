const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log("Cookies:", req.cookies); // Log cookies
        if (!token) {
            return res.status(401).json({
                message: "User is not authenticated",
                success: false
            });
        }

        // Decode the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log("Token:", token); // Log the token
        console.log("Decoded Token:", decoded); // Log the decoded token

        // Check and assign the correct userId from the decoded token
        if (decoded && decoded.userId) {
            req.id = decoded.userId;
        } else if (decoded && decoded.id) {
            req.id = decoded.id; // Use this if the ID is stored with a different key
        } else {
            console.log("Invalid token: userId not found");
            return res.status(401).json({
                message: "Invalid token: userId not found",
                success: false
            });
        }

        console.log("req.id:", req.id); // This should now print the correct userId
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

module.exports = isAuthenticated;
