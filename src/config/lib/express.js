const express=require("express");

const path=require("path");

const config=require("../index");

module.exports=()=>{
    const app=express();

    app.use(express.json());

    const globalPaths = config.getGlobalPath();

    globalPaths.routes.forEach(routePath => {
        require(path.resolve(routePath))(app);   
    });

    return app;

}

