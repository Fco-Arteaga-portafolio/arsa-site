#!/usr/bin/env bash

set -Eeuo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd -- "${SCRIPT_DIR}/.." && pwd)"
DEPLOY_ROOT="${DEPLOY_ROOT:-$(cd -- "${PROJECT_ROOT}/.." && pwd)}"
DIST_ROOT="${PROJECT_ROOT}/dist/arsa-landing"

if [[ "$(basename -- "${PROJECT_ROOT}")" != "arsa-site" ]]; then
  echo "Error: se esperaba que el repositorio se llamara arsa-site." >&2
  exit 1
fi

if [[ "${DEPLOY_ROOT}" == "${PROJECT_ROOT}" || "${DEPLOY_ROOT}" == "/" ]]; then
  echo "Error: la carpeta de despliegue no es segura: ${DEPLOY_ROOT}" >&2
  exit 1
fi

if [[ ! -d "${DEPLOY_ROOT}" ]]; then
  echo "Error: no existe la carpeta de despliegue: ${DEPLOY_ROOT}" >&2
  exit 1
fi

if ! command -v rsync >/dev/null 2>&1; then
  echo "Error: rsync no está instalado. Instálalo con: apt-get install rsync" >&2
  exit 1
fi

cd -- "${PROJECT_ROOT}"

BUILD_DIR="${DIST_ROOT}"
if [[ -d "${DIST_ROOT}/browser" ]]; then
  BUILD_DIR="${DIST_ROOT}/browser"
fi

if [[ ! -f "${BUILD_DIR}/index.html" ]]; then
  echo "Error: no se encontró ${BUILD_DIR}/index.html después del build." >&2
  exit 1
fi

echo "Publicando build local en ${DEPLOY_ROOT}..."
rsync -a --delete \
  --exclude='arsa-site/' \
  --exclude='.well-known/' \
  --exclude='.env' \
  --exclude='.env.*' \
  "${BUILD_DIR}/" "${DEPLOY_ROOT}/"

echo "Despliegue terminado: ${DEPLOY_ROOT}/index.html"
