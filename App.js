import express from 'express';
import session from 'express-session';
import cors from 'cors';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import 'dotenv/config';

import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import CourseRoutes from './Kanbas/Courses/routes.js';
import ModuleRoutes from './Kanbas/Modules/routes.js';
import AssignmentsRoutes from './Kanbas/Assignments/route.js';
import UserRoutes from './Users/routes.js';

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.NETLIFY_URL,
}));

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: CONNECTION_STRING,
        collectionName: 'sessions',
        ttl: 14 * 24 * 60 * 60 // = 14 days
    })
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}

app.use(session(sessionOptions));
app.use(express.json());

// Register routes
UserRoutes(app);
Hello(app);
Lab5(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentsRoutes(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});