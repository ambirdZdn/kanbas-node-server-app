import * as dao from "./dao.js";

export default function ModuleRoutes(app) {
    const createModule = async (req, res) => {
        try {
            const module = await dao.createModule(req.body);
            res.status(201).json(module);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    
    const deleteModule = async (req, res) => {
        try {
            const status = await dao.deleteModule(req.params.moduleId);
            if (status.deletedCount === 0) {
                res.status(404).json({ error: "Module not found" });
            } else {
                res.json(status);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    
    const findModuleByName = async (req, res) => {
        const module = await dao.findModuleByName(req.params.name);
        res.json(module);
      };
        
      const findAllModules = async (req, res) => {
        const {cid} = req.params;
        console.log("cid is:", cid);
        const modules = await dao.findModuleByCourse(cid);
        console.log("modules is:", modules);
        res.json(modules);
      };
      

    const findModuleById = async (req, res) => {
        try {
            const module = await dao.findModuleById(req.params.moduleId);
            if (module) {
                res.json(module);
            } else {
                res.status(404).json({ error: "Module not found" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    const updateModule = async (req, res) => {
        try {
            const { moduleId } = req.params;
            const status = await dao.updateModule(moduleId, req.body);
            if (status.matchedCount === 0) {
                res.status(404).json({ error: "Module not found" });
            } else {
                res.json(status);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    
    app.post("/api/modules", createModule);
    app.delete("/api/modules/:moduleId", deleteModule);
    app.get("/api/courses/:cid/modules", findAllModules);
    app.get("/api/courses/:cid/modules/:moduleId", findModuleById);
    app.get("/api/courses/:cid/modules/:name", findModuleByName);
    app.put("/api/modules/:moduleId", updateModule);
}