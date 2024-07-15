import Database from "../Database/index.js";
export default function CourseRoutes(app) {
    
    app.get("/api/courses", (req, res) => {
    const courses = Database.courses;
    res.send(courses);
    }); 

    app.post("/api/courses", (req, res) => {
        const course = { ...req.body,_id: new Date().getTime().toString() };
        Database.courses.push(course);
        res.send(course);
    });

    app.delete("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const courseIndex = Database.courses.findIndex((c) => c._id === id);
        if (courseIndex === -1) {
            // If the course is not found, return a 404 status code
            return res.sendStatus(404);
        }
        // If the course is found, delete it
        Database.courses.splice(courseIndex, 1);
        // Return a 204 No Content status code
        res.sendStatus(204);
    });

    app.put("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const course = req.body;
        Database.courses = Database.courses.map((c) =>
        c._id === id ? { ...c, ...course } : c
        );  
        res.sendStatus(204);
    });
    
} 