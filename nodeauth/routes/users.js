var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/register', function(req, res, next) {
  res.render('register',{ //register is view file name
    'title' : 'Register'
  })
})
router.get('/login', function(req, res, next) {
  res.render('login',{ //register is view file name
    'title' : 'Login'
  })
})
//หลังจากกรอกฟอร์มแล้วก็ต้องใช้ method post
router.post('/register', function(req, res, next){
  //Get Form Values
  var name = req.body.name;
  var email = req.body.email;
  var uername = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

//Check for Image Field ใช้ multer 
if(req.files.profileimage){
  console.log('uploading File...');
//File Info
  var profileImageOriginalName = req.files.profileimage.originalname;
  var profileImageName         = req.files.profileimage.name;
  var profileImageMime        = req.files.profileimage.mimetype;
  var profileImagePath         = req.files.profileimage.path;
  var profileImageExt         = req.files.profileimage.extenstion;
  var profileImageSize         = req.files.profileimage.size;
}else{
  //Set a Default Imange
  var profileImageName = 'noimage.png';
}

// Form validation
  req.checkBody('name','Name field is required').notEmpty()
  req.checkBody('email','Email field is required').notEmpty()
  req.checkBody('email','Email not valid').isEmail()
  req.checkBody('username','UserName field is required').notEmpty()
  req.checkBody('password','Password field is required').notEmpty()
  req.checkBody('password2','Passwords do not math').equals(req.body.password)


  //check for errors
  var errors = req.validationErrors();

  if(errors){
    res.render('register',{
      errors: errors,          
      name: name,    //กรณีที่ errorแล้วไม่ต้องกรอกช่องที่ถูกแล้วใหม่
      email:email,    //กรณีที่ errorแล้วไม่ต้องกรอกช่องที่ถูกแล้วใหม่
      username: username,       //กรณีที่ errorแล้วไม่ต้องกรอกช่องที่ถูกแล้วใหม่
      password: password,   //กรณีที่ errorแล้วไม่ต้องกรอกช่องที่ถูกแล้วใหม่
      password2: password2    //กรณีที่ errorแล้วไม่ต้องกรอกช่องที่ถูกแล้วใหม่
    });
  }else{
    var newUser = new User({
      name: name,    
      email:email,    
      username: username,       
      password: password,  
      profileimage: profileImageName
    });
    //Create User
    //Users.createUser(newUser, function(err,user){
      //if(err) throw err;
     // console.log(user);
   // });

    //Success message
    req.flash('success', 'You are now registered and my log in');
    //เสร็จแล้วรีไดเร็คไปที่โฮมเพจ
    res.location('/');
    res.redirect('/');
  }
});

module.exports = router;
