const User = require("../models/Users");

const createAdminUser = async () => {
  const userFound = await User.findOne({ username: "administrador" });

  if (userFound) return;

  const newUser = new User({
    name:"admin",
    lastname:"valdes",
    username:"administrador",
    phone:"5573549436",
    email:"eliottvaldes@hotmail.com"    
  });

  newUser.password = await newUser.encpass("adminpassword");

  const admin = await newUser.save();

  console.log("Adminsitrador creado", admin);
};

module.exports = { createAdminUser };
