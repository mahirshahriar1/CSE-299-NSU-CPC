const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const passportUtil = require("./utils/passport");
const authRoutes = require("./routes/authRoutes");

/// routes
const userRoutes = require("./routes/userRoutes");
const corporateRoutes = require("./routes/corporateRoutes");
const jobRoutes = require("./routes/jobRoutes");
const adminRoutes = require("./routes/adminRoutes");
const applyJobRoutes = require('./routes/jobApplyRoutes');
///

dotenv.config();

const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    next();
});

app.use(
    cors({
        origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
        methods: "GET, POST, PATCH, DELETE, PUT",
        credentials: true,
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
passportUtil(app);

const connectDB = require("./config/db");
connectDB();

app.use("/", authRoutes);
app.use("/users", userRoutes);
app.use("/corporate", corporateRoutes);
app.use("/jobs", jobRoutes);
app.use("/admin", adminRoutes);
app.use("/applyjob", applyJobRoutes);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
