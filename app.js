const express = require('express');
const path = require('path');
const session = require('express-session');
const db = require('./config/db');
const app = express();
const PORT = 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sessão
app.use(session({
  secret: 'chave-secreta',
  resave: false,
  saveUninitialized: false
}));

// Middleware para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para passar o usuário logado às views
app.use((req, res, next) => {
  res.locals.userId = req.session.userId;
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Body:', req.body);
  console.log('Files:', req.files);
  console.log('Session:', req.session);
  console.log('---');
  next();
});
// Middleware de debug para ver todos os requests
// ⚠️ IMPORTANTE: Middleware para parsing de formulários deve vir ANTES das rotas
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Rotas
const homeRoutes = require('./routes/homeRoutes');
const authRoutes = require('./routes/authRoutes');
const perfilRoutes = require('./routes/perfilRoutes');
const planoRoutes = require('./routes/planoRoutes');
const treinoRoutes = require('./routes/treinoRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes')

app.use('/', homeRoutes);
app.use('/auth', authRoutes);
app.use('/perfil', perfilRoutes);
app.use('/planos', planoRoutes);
app.use('/treinos', treinoRoutes);
app.use('/usuarios', usuariosRoutes); 

// Inicia o banco e servidor
db.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Erro ao conectar com o banco de dados:', err);
});