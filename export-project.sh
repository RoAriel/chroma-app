#!/bin/bash
# export-project.sh
# Ejecutar desde la raíz del proyecto: bash export-project.sh

OUTPUT="project-export.txt"

> "$OUTPUT"

echo "==================================================" >> "$OUTPUT"
echo "  CHROMALAB — PROJECT EXPORT" >> "$OUTPUT"
echo "  $(date)" >> "$OUTPUT"
echo "==================================================" >> "$OUTPUT"
echo "" >> "$OUTPUT"

# Árbol de archivos
echo "## ESTRUCTURA" >> "$OUTPUT"
echo '```' >> "$OUTPUT"
find . \
  -path ./node_modules -prune -o \
  -path ./.git -prune -o \
  -path ./dist -prune -o \
  -path ./.vite -prune -o \
  -type f \( -name "*.jsx" -o -name "*.js" -o -name "*.css" -o -name "*.html" \) \
  -print | sort >> "$OUTPUT"
echo '```' >> "$OUTPUT"
echo "" >> "$OUTPUT"

# Contenido de cada archivo
find . \
  -path ./node_modules -prune -o \
  -path ./.git -prune -o \
  -path ./dist -prune -o \
  -path ./.vite -prune -o \
  -type f \( -name "*.jsx" -o -name "*.js" -o -name "*.css" -o -name "*.html" \) \
  -print | sort | while read -r file; do
    echo "==================================================" >> "$OUTPUT"
    echo "## FILE: $file" >> "$OUTPUT"
    echo '```' >> "$OUTPUT"
    cat "$file" >> "$OUTPUT"
    echo "" >> "$OUTPUT"
    echo '```' >> "$OUTPUT"
    echo "" >> "$OUTPUT"
done

echo "✅ Export completado: $OUTPUT"