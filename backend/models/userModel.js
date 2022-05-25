const mongoose = require ("mongoose");
const bcrypt = require("bcryptjs");

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
        pic: {type: String,
        default: "https://img.icons8.com/external-dreamstale-lineal-dreamstale/64/000000/external-avatar-avatars-dreamstale-lineal-dreamstale.png"},

    },
    {
        timestamps : true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

  
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);



module.exports = User;