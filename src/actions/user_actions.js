const user_schema = require("../models/User")

user_schema.pre("save", async function(next){
    try {
        const salt =  await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(this.password, salt);
        this.password = password_hash;
        next();
    } catch {
        throw new Error(error);
    }
});


