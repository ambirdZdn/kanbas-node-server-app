import model from "./model";

export const createModule = (module) => {
    delete module._id; //remove _id field from the request
    return model.create(module);
}

export const findAllModules = () => model.find();
export const findModuleById = (moduleId) => model.findById(moduleId);
export const findModulesByCourse = (courseId) => model.find({ course: courseId });

export const updateModule = (moduleId, module) => model.updateOne({ _id: moduleId }, { $set: module });

export const deleteModule = (moduleId) => model.deleteOne({ _id: moduleId });
