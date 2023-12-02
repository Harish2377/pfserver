const projects = require("../models/projectSchema");

//addproject
exports.addProjects = async (req,res)=>{
    console.log("Inside add project function");
    const userId = req.payload
    const projectimage = req.file.filename
    const {title,language,overview,github,website} = req.body
    // console.log(`${title},${language},${overview},${github},${website},${projectimage},${userId}`);

    try {

        const existingProject = await projects.findOne({github})
        if (existingProject) {

            res.status(406).json("Project already exist!!! upload another")
            
        } else {
            const newProject = new projects({

                title, language, overview, github, website, projectimage, userId
                
            })
            await newProject.save()
            res.status(200).json(newProject)
            
        }

        
    } catch (err) {

        res.status(401).json(`Request failed, Error: ${err}`)
        
    }


    res.status(200).json("addprojects request received")
}


//get user projects
exports.allUserProjects = async (req,res)=>{
    const userId = req.payload
    try {
        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)
    } catch (err) {
        res.status(401).json(err)   
    }
}


//get allprojects
exports.getallProjects = async (req,res)=>{

    const searchKey = req.query.search
    const query = {
        language:{$regex:searchKey , $options:"i"}
    }
    
    try {
        const ProjectDetails = await projects.find(query)
        res.status(200).json(ProjectDetails)
    } catch (err) {
        res.status(401).json(err)   
    }
}


//get homeprojects
exports.getHomeProjects = async (req,res)=>{
    try {


        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
        
    } catch (err) {

        res.status(401).json(err)   
        
    }
}


//edit project
exports.editProjectController = async (req,res)=>{
    //get project id
    const {id} = req.params
    const userId = req.payload
    const { title,language,overview,github,website,projectimage } = req.body
    const uploadProjectimage = req.file?req.file.filename:projectimage

    try {

        const updateProject = await projects.findByIdAndUpdate({_id:id},{
            title,language,overview,github,website,projectimage:uploadProjectimage,userId
        },{new:true})

        await updateProject.save()
        res.status(200).json(updateProject)
        
    } catch (err) {
        res.status(401).json(err)
    }
}


//delete projects
exports.deleteProjectController = async (req,res)=>{
    //get project details
    const {id} = req.params
    try {
        const removeProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)
        
    } catch (err) {

        res.status(401).json(err)
        
    }
}





