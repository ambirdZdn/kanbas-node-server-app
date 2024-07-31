import * as dao from "./dao.js";

export default function CourseRoutes(app) {
    const createCourse = async (req, res) => {
        const course = await dao.createCourse(req.body);
        res.json(course);
    };
    
    const deleteCourse = async (req, res) => {
        const status = await dao.deleteCourse(req.params.courseId);
        res.json(status);
    };
    
    const findAllCourses = async (req, res) => {
        console.log("Fetching all courses..."); // Add logging
        const { subject, name } = req.query;
        try {
        let courses;
        if (subject) {
            courses = await dao.findCoursesBySubject(subject);
        } else if (name) {
            courses = await dao.findCoursesByPartialName(name);
        } else {
            courses = await dao.findAllCourses();
        }
        console.log("Courses fetched:", courses); // Add logging
        res.json(courses);
        } catch (error) {
        console.error("Error fetching courses:", error); // Error logging
        res.status(500).json({ message: "Error fetching courses" });
        }
    };
    
    const findCourseById = async (req, res) => {
        const course = await dao.findCourseById(req.params.courseId);
        res.json(course);
    };
    
    const updateCourse = async (req, res) => {
        const { courseId } = req.params;
        const status = await dao.updateCourse(courseId, req.body);
        res.json(status);
    };
    
    app.post("/api/courses", createCourse);
    app.delete("/api/courses/:courseId", deleteCourse);
    app.get("/api/courses", findAllCourses);
    app.get("/api/courses/:courseId", findCourseById);
    app.put("/api/courses/:courseId", updateCourse);
    }
    