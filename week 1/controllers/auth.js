const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const customApiError = require("../errors");

const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new customApiError.BadRequestError(
            "Please provide an email and password"
        );
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new customApiError.NotFoundError("Invalid Credentials");
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new customApiError.UnAuthenticatedError("Invalid Credentials");
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
    register,
    login,
};