const express=require("express");

const path=require("path");

const config=require("../index");

const cookieParser=require("cookie-parser")

module.exports=()=>{
    const app=express();

    app.use(express.json());
    app.use(cookieParser("cookie-secret"));

    const globalPaths = config.getGlobalPath();

    globalPaths.routes.forEach(routePath => {
        require(path.resolve(routePath))(app);   
    });

    globalPaths.strategies.forEach(strategyPath => {
        require(path.join(process.cwd(),strategyPath))();
    });

    return app;

}

