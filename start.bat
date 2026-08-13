@echo off
REM Script de démarrage pour le projet Golden Drive avec Admin
REM Démarre le backend et frontend automatiquement sur Windows

echo.
echo ============================================
echo   Golden Drive - Démarrage Complet
echo ============================================
echo.

REM Vérifier si npm est installé
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Erreur: npm n'est pas installé ou non accessible
    echo Assurez-vous que Node.js est correctement installé
    pause
    exit /b 1
)

echo ✅ npm est installé

REM Vérifier si les dépendances sont installées
if not exist "node_modules" (
    echo.
    echo 📦 Installation des dépendances...
    call npm install
    if errorlevel 1 (
        echo ❌ Erreur lors de l'installation des dépendances
        pause
        exit /b 1
    )
)

echo.
echo ============================================
echo   Configuration du projet
echo ============================================
echo.
echo Frontend URL: http://localhost:8080
echo Backend URL:  http://localhost:3000
echo Admin URL:    http://localhost:8080/admin
echo.
echo À FAIRE APRÈS LE DÉMARRAGE:
echo 1. Attendre que les deux serveurs se lancent
echo 2. Visiter: http://localhost:3000/api/init
echo 3. Aller à: http://localhost:8080/admin
echo.
echo ============================================
echo.

REM Lancer le backend dans un nouveau terminal
echo 🚀 Lancement du serveur backend...
start cmd /k "cd /d "%CD%" && npm run server"

REM Attendre un peu que le backend démarre
timeout /t 3 /nobreak

REM Lancer le frontend dans un nouveau terminal
echo 🎨 Lancement du frontend...
start cmd /k "cd /d "%CD%" && npm run dev"

echo.
echo ✅ Les deux serveurs ont été lancés dans de nouveaux terminaux
echo.
echo Attendez quelques secondes que les serveurs se stabilisent...
echo Appuyez sur une touche pour continuer
pause

REM Ouvrir le navigateur avec le frontend
start http://localhost:8080

echo.
echo 🌐 Navigation ouverte vers http://localhost:8080
echo.
echo Pour initialiser la base de données, visitez:
echo http://localhost:3000/api/init
echo.
echo Ensuite, accédez à l'admin:
echo http://localhost:8080/admin
echo.
