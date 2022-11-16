module.exports = {
    routes: [
        // "src/modules/**/*.routes.js",
        "src/modules/platform/user/user.routes.js",
        "src/modules/platform/profile/profile.routes.js",
        "src/modules/platform/permission/permission.routes.js",
        "src/modules/platform/service/service.routes.js",
        
        "src/modules/merchant/merchant.routes.js",
        "src/modules/product/product.routes.js",
    ],
    strategies: [
        // "src/modules/**/*.strategy.js",
        "src/modules/platform/user/user.strategy.js",
        "src/modules/merchant/merchant.strategy.js"
    ]
};
