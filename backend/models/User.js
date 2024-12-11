const  mongoose=require('mongoose');

//definir le schema user
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    //userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    
});
//creer un model base sur schema
const User=mongoose.model('User',UserSchema);

module.exports=User;
