// import jwt from 'jsonwebtoken'
// import bcrypt from 'bcryptjs'

// export const login = async (req, res) => {
//   const { username, password } = req.body


//   if (username !== process.env.ADMIN_USERNAME) {
//     return res.status(401).json({ message: 'Invalid username or password' })
//   }


//   if (password !== process.env.ADMIN_PASSWORD) {
//     return res.status(401).json({ message: 'Invalid username or password' })
//   }

//   // token create
//   const token = jwt.sign(
//     { username },
//     process.env.JWT_SECRET,
//     { expiresIn: '1d' }
//   )

//   res.json({ success: true, token })
// }


import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()    // dotenv config

export const login = async (req, res) => {
  const { username, password } = req.body

  console.log('Received:', username, password)
  console.log('ENV:', process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD)

  if (username !== process.env.ADMIN_USERNAME) {
    return res.status(401).json({ message: 'Invalid username or password' })
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid username or password' })
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1d' })
  res.json({ success: true, token })
}

