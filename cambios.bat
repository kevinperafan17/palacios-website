@echo off
cd "C:\Users\LENOVO\Desktop\Kevin Yerson Perafan\4.  Pagina Web\Palacios Asesaores & Revisores"
echo.
echo ================================
echo Subiendo cambios a GitHub...
echo ================================
set /p msg=Escribe el mensaje del commit:
git add .
git commit -m "%msg%"
git push origin main
echo.
echo ================================
echo Cambios subidos correctamente.
pause
