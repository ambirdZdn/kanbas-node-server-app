import model from "./model";

export const createCourse = (course) => {
    delete course._id; //remove _id field from the request
    return model.create(course);
}

export const findAllCourses = () => model.find();
export const findCourseById = (courseId) => model.findById(courseId);

export const updateCourse = (courseId, course) => model.updateOne({ _id: courseId }, { $set: course });

export const deleteCourse = (courseId) => model.deleteOne
({ _id: courseId });


