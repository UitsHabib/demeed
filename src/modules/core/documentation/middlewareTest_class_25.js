function signup (req, res, next) {
    const { username, email, password } = req.body;

    res.user = "Iqbal"
}

function validate () {
    async function middlewareFunction (req, res, next) {
        const { username, email, password } = req.body;
        console.log(res.user);

        await next();

        console.log("Iqbal");
        console.log(res.user);
    }

    return middlewareFunction;
}

async function a (req, res, next) {
    const { username, email, password } = req.body;
    
    await next();

    console.log(res.user);
}

module.exports = app => {
    app.route('/app/register').post(a, validate(registerSchema), signup);
}