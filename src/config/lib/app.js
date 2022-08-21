const app=require("./express")();

module.exports.start=()=>{
    
    const port=5000;

    app.listen(port,()=>{
        console.log(`listening to port ${port}`);
    });
    
}