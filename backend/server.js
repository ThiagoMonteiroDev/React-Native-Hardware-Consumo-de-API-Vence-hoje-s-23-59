const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

// Inicializando a aplicação Express
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Conectar ao MongoDB
const DATABASE_URL = "mongodb+srv://Bea:ozngl7aoEphQws3w@users.wvzhq.mongodb.net/Users?retryWrites=true&w=majority&appName=Users";
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conectado ao MongoDB"))
    .catch(err => console.log("Erro de conexão:", err));

// Definindo o modelo de Usuário
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
});
const User = mongoose.model('User', UserSchema);

// Definindo o modelo de Filmes
const MovieSchema = new mongoose.Schema({
    title: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const Movie = mongoose.model('Movie', MovieSchema);

// Rota de Registro
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        
        res.status(201).send({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
        res.status(500).send({ message: 'Erro ao registrar usuário', error });
    }
});

// Rota de Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ message: 'Usuário não encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send({ message: 'Senha incorreta' });

    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
    res.json({ token });
});

// Rota para Adicionar Filme
app.post('/api/movies', async (req, res) => {
    const { title, userId } = req.body;
    const movie = new Movie({ title, userId });
    await movie.save();
    res.status(201).send({ message: 'Filme salvo com sucesso' });
});

// Rota para listar filmes do usuário
app.get('/api/movies/:userId', async (req, res) => {
    const { userId } = req.params;
    const movies = await Movie.find({ userId });
    res.json(movies);
});

// Iniciando o servidor
app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});
