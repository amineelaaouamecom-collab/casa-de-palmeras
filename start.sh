#!/usr/bin/env bash
# Script de démarrage pour macOS/Linux

echo ""
echo "============================================"
echo "   Golden Drive - Démarrage Complet"
echo "============================================"
echo ""

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Erreur: Node.js n'est pas installé"
    echo "Téléchargez-le depuis: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js est installé: $(node -v)"
echo "✅ npm est installé: $(npm -v)"
echo ""

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Erreur lors de l'installation"
        exit 1
    fi
fi

echo ""
echo "============================================"
echo "   Configuration du projet"
echo "============================================"
echo ""
echo "Frontend URL: http://localhost:8080"
echo "Backend URL:  http://localhost:3000"
echo "Admin URL:    http://localhost:8080/admin"
echo ""
echo "À FAIRE APRÈS LE DÉMARRAGE:"
echo "1. Attendre que les deux serveurs se lancent"
echo "2. Visiter: http://localhost:3000/api/init"
echo "3. Aller à: http://localhost:8080/admin"
echo ""
echo "============================================"
echo ""

# Lancer le backend
echo "🚀 Lancement du serveur backend..."
npm run server &
BACKEND_PID=$!

# Attendre un peu
sleep 3

# Lancer le frontend
echo "🎨 Lancement du frontend..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Les deux serveurs ont été lancés"
echo ""
echo "Backend PID:  $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter tous les serveurs"
echo ""

# Attendre que les serveurs se terminent
wait $BACKEND_PID $FRONTEND_PID

echo ""
echo "🛑 Serveurs arrêtés"
