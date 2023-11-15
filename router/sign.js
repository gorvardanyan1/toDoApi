import express from "express"
export const sign = express.Router()
import { insertUser } from "../db/dbFunctions.js"
import { selectUser } from "../db/dbFunctions.js"
import { getFullUTCDate } from "../additionalFunction/additional.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



sign.post("/up", async (req, res) => {
    const { firstName, lastName, userName, password, born, gender } = req.body
    if (firstName != "" && lastName != "" && born != "" && gender != "" && password != "") {
        const hashedPasswrod = await bcrypt.hash(password, 9)
        const sendedDate = {
            firstName,
            lastName,
            born,
            gender,
            userName,
            password: hashedPasswrod,
            signUpDate: getFullUTCDate()
        }
        try {
            await insertUser("toDoAppDb", "users", sendedDate)
            res.sendStatus(200)
        } catch (error) {
            if (error.code === 11000) {
                res.sendStatus(409)
            }

        }
    }else {
        res.sendStatus(400)
    }


})

sign.post("/in", async (req, res) => {
    
    const { userName, password } = req.body
    if (userName != "" && password != "") {
        const user = await selectUser("toDoAppDb", "users", { userName })
        if (user) {
            const isCompare = await bcrypt.compare(password, user.password)
           if(isCompare){
                const accessToken= jwt.sign({_id:user._id},process.env.SECRET_KEY,{ expiresIn: '10h' })      
                res.cookie('jwt', accessToken , {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000 // 1 day
                })
            
                res.send({
                    message: 'success'
                })
           } 
           else{
            res.sendStatus(400)
           }
        }
        else {
            res.sendStatus(400)
        }

    }
    else {
        res.sendStatus(400)
    }


})
sign.get("/out", (req,res)=>{
    req.session.accessToken = undefined
    req.session.userId = undefined
    console.log(req.session);
    res.sendStatus(200)
})

// passport.use(new LocalStrategy(
//     (username, password, done) => {
//       // Find the user in the MongoDB database
//       const usersCollection = client.db('toDoAppDb').collection('users');
  
//       usersCollection.findOne({ userName: username, password: password }, (err, user) => {
//         if (err) { return done(err); }
//         if (!user) {
//           return done(null, false, { message: 'Incorrect username or password' });
//         }
//         return done(null, user);
//       });
//     }
//   ));

// passport.serializeUser((user, done) => {
//     done(null, user._id.toString());
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await selectUser("toDoAppDb", "users", { _id: new ObjectId(id) });
//         console.log(user);
//         done(null, user);
//     } catch (error) {
//         done(error, null);
//     }
// });


// sign.post('/in',
//     passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/' })
// );
// sign.get('/dashboard', isAuthenticated, (req, res) => {
//     res.send(`Welcome  to the Dashboard!`);
// });

// function isAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/');
// }