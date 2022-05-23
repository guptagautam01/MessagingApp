const mongoose = require ("mongoose");

const userSchema = mongoose.Schema(
    {
        name : {type: String, required:true},
        email: 
        {
            type: String, 
            required: true, 
            trim: true,
            lowercase: true,
            unique: true,
            validate: {
                validator: function(v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: "Please enter a valid email",
            },
        },
        password: {type: String, required:true},
        pic: {type: String, required:true,
        default: "https://img.icons8.com/external-dreamstale-lineal-dreamstale/64/000000/external-avatar-avatars-dreamstale-lineal-dreamstale.png"},

    },
    {
        timestamps : true,
    }
);

const User = mongoose.Model("User", userSchema);

module.exports = User;