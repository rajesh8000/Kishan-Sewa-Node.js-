import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123356', 10),
    isAdmin: true,
  },
  {
    name: 'Raj Lama',
    email: 'lama@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Rajesh Thapa',
    email: 'thapa@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
