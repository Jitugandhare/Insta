const bcypt = require("bcrypt");


const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(401).json({
                message: "Something is missing,Try again",
                succss: false,
            });
        }

        const user = await UserActivation.findOne({ email })
        if (user) {
            return res.status(401).json({
                message: "Email is already exist",
                succss: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        await UserActivation.create({
            username,
            email,
            password: hashedPassword
        })
        return res.status(201).json({
            message: "Account succefully created",
            success: true
        })

    } catch (err) {
        console.log(err)
    }

}