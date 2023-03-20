const jwt = require('jsonwebtoken');
const User = require('./../models/UserModel');
const bcrypt = require('bcryptjs');

// 1)creating a function for creating a jwt token and taking user id as a paramater
const jwt_sign = (id) => {
  return (token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_END,
  }));
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      admin:false,
      profilePhoto:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    });

    const token = jwt_sign(newUser._id);

    res.status(200).json({
      status: 'sucess',
      token,
      data: newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        messsage: 'please provide a vaild email and password',
      });
    }

    const user = await User.findOne({ email });

    const correct = await bcrypt.compare(password, user.password);

    if (!correct) {
      return res.status(400).json({
        status: 'fail',
        message: 'incorrect email or password',
      });
    }
    const admin=user.admin;
    const token = jwt_sign(user._id);

    res.status(200).json({
      status: 'sucess',
      message: 'sucessfully logged in',
      token,
      admin
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getUser=async(req,res)=>{
  try{
    const decoded=jwt.verify(req.headers.token,process.env.JWT_SECRET);
    if(!decoded){
      res.status(401).json({
        status:"fail",
        message:"you are not authorized to access this page"
      });
    }

    const data = await User.findById({_id:decoded.id});

    res.status(200).json({
      status:"success",
      data
    })

  }catch(err){
    console.log(err);
    res.status(500).json({
      status:"fail",
      message:"internal sever error"
    })
  }
}


exports.updateUser=async(req,res)=>{
  try{
    const decoded=jwt.verify(req.headers.token,process.env.JWT_SECRET);
    if(!decoded){
      res.status(401).json({
        status:"fail",
        message:"you are not authorized to access this page",
      });
    }

    await User.findByIdAndUpdate({_id:decoded.id},{
      email:req.body.email,
      admin:false,
      profilePhoto:req.body.profilePhoto,
    })

    res.status(200).json({
      status:"success",
    })
  }catch(err){
    console.log(err);
    res.status(500).json({
      status:"fail",
      message:"internal server error",
    })
  }
}

exports.deleteUser=async(req,res)=>{
  try{
    const decoded=jwt.verify(req.headers.token,process.env.JWT_SECRET);
    if(!decoded){
      res.status(401).json({
        status:"fail",
        message:"you are not authorized to visit this page",
      })
    }

    await User.findByIdAndDelete({_id:decoded.id});

    res.status(200).json({
      status:"success",
    })

  }catch(err){
    console.log(err)
    res.status(500).json({
      status:"fail",
      message:"internal server error"
    })
  }
}