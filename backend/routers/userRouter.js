import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { db } from '../server.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const router = express.Router();
//'/api/users'에서 시작한다.

router.post('/signup', expressAsyncHandler( async (req,res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  bcrypt.hash(password, saltRounds, (err,hash) => {
    if(err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO user_details (user_email, user_password, user_name, user_type, user_status) VALUES (?,?,?,?,?)",
      [email, hash, name, 'master', 'Active'],
      (err, result) => {
        // 에러 처리와 결과 값을 넘겨주는 코드가 필요
        if(err) {
          console.log(err);
        }
        if(result) {
          res.send(result);
        } else {
          res.send({ message: "Fail to sign up" });
        }
      }
    )
  });
}));

router.post('/signin', expressAsyncHandler( async (req,res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    "SELECT * FROM user_details WHERE user_email = ?",
    email,
    (err, result) => {
      if(err) {
        console.log({ error: err });
      }
      if(result.length > 0) {
        bcrypt.compare(password, result[0].user_password, (err,response) => {
          if(response) {
            const id = result[0].user_id;
            const token = jwt.sign({id}, 'jwtSecret', {
              expiresIn: 300, 
            })
            // token을 frontend로 보내기
            res.send({ isAuth: true, token: token, result: result });    
          } else {
            res.send({ message: 'Wrong email or password' });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  )
}));

router.get('/', expressAsyncHandler( async (req,res) => {
  // user table에 모든 정보를 가져오기
  db.query(
    'SELECT * FROM user_details', 
    (err, result) => {
      if(err) {
        console.log({ error: err });
      }
        if(result) {
          res.send(result)
        } else {
          res.send({ message: "Fail to bring userInfo" });
        }
    }
  )
}));

export default router;


