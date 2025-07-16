#!/bin/bash

# Ruta al proyecto
PROYECTO="/home/perafan/Escritorio/Kevin Perafan/Palacios/Pagina Web"

# Ir al directorio
cd "$PROYECTO" || { echo "No se pudo acceder al directorio: $PROYECTO"; exit 1; }

# Mostrar estado
echo "🟡 Cambios detectados:"
git status

# Agregar todos los cambios
git add .

# Solicitar mensaje de commit
read -p "📝 Escribe el mensaje del commit: " mensaje

# Confirmar y hacer commit
git commit -m "$mensaje"

# Hacer push al repositorio remoto
git push origin main

echo "✅ Cambios enviados exitosamente a GitHub."
