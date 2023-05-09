// Importe le module HTTP pour créer un serveur web
const http = require('http');

// Importe l'application Express créée dans le fichier app.js
const app = require('./app');

// Fonction pour normaliser le port d'écoute en nombre ou en chaîne de caractères
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

// Détermine le port d'écoute à utiliser en fonction de la variable d'environnement PORT ou à défaut le port 4000
const port = normalizePort(process.env.PORT || '4000');

// Configure l'application Express pour utiliser le port d'écoute déterminé
app.set('port', port);

// Fonction pour gérer les erreurs de démarrage du serveur
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// Crée un serveur HTTP en utilisant l'application Express
const server = http.createServer(app);

// Gère les erreurs de démarrage du serveur
server.on('error', errorHandler);

// Écoute les connexions entrantes sur le port d'écoute configuré et affiche un message dans la console lorsque le serveur démarre
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

// Démarre le serveur en écoutant les connexions entrantes sur le port d'écoute configuré
server.listen(port);