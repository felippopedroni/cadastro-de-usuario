const jwt = require("jsonwebtoken");


const users = [
    {"email": "user@example.com", "password": "123456"},
    {"email": "user2@example.com", "password": "654321"}
];


const login = (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const token = jwt.sign({ email: user.email }, 'secreta', { expiresIn: '1h' });
    res.json({ token });
};


module.exports = { login };
