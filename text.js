const EmailService = require("../../config/lib/email-service/email.service");

const options = {
    toAddresses: [email],
    templateUrl: "src/config/lib/email-service/templates/email.handlebars",
    subject: "Registration Confirmation",
    data: {},
};

EmailService.send(options);
res.status(201).send(user);