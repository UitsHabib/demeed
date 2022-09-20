const validateSchema = (schema) =>{
    return async(req,res,next)=>{
        try {
            await schema.validate(req.body, {abortEarly:false});
            next();
        } catch (error) {
            // console.log(error);
            const errs=[];
            error.inner.forEach(element => {
                errs.push({path:element.path, message:element.message})          
            });
            res.status(400).send(errs)
        }
    }
}

module.exports= validateSchema;
