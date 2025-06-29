@echo off
cd /d "C:\Users\LENOVO\Desktop\Kevin Yerson Perafan\4.  Pagina Web\Palacios Asesaores & Revisores"

echo -----------------------------
echo Subiendo cambios a GitHub...
echo -----------------------------

git add .

set /p mensaje=Escribe el mensaje del commit: 
git commit -m "%mensaje%"

git push origin main

echo -----------------------------
echo Cambios subidos correctamente.
pause
