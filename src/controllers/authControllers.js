const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../models/userModel');
const { secret } = require('../config/jwt');
const { registerSchema, loginSchema } = require('../validations/authValidation');


exports.register = async(req, res) => {
    const {error} = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message })

    const { name, email, password, role } = req.body;

    if (users.find(user => user.email === email)){
        return res.status(400).json({ message : "User Already Exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = { id: users.length + 1, name, email, password: hashedPassword, role: role}
    users.push(newUser);

    res.status(201).json({ message : "User registered successfully"})
}

exports.login = async(req, res) => {
    const {error} = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message })

    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    
    if (!user || !(await bcrypt.compare(password, user.password))){
        return res.status(400).json({ message : "Invalid credentials"});
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role}, secret, { expiresIn: '1h'});
    res.status(200).json({ message : "Login Successful", token : token})
}

