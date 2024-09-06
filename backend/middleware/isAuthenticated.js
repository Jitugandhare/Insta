const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({
                message: "User is not authenticated",
                success: false
            });
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error("Token verification error:", err);
                return res.status(401).json({
                    message: "Invalid token",
                    success: false
                });
            }

            if (decoded) {
                req.id = decoded.userId; 
                next();
            } else {
                console.log("Invalid token: userId not found");
                return res.status(401).json({
                    message: "Invalid token: userId not found",
                    success: false
                });
            }
        });
    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

module.exports = isAuthenticated;
