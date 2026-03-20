#!/bin/bash
set -euo pipefail

# 如果定义了 REGISTRY_URL，则设置包管理器镜像源
if [ -n "${REGISTRY_URL:-}" ]; then
  npm config set registry "${REGISTRY_URL}"
fi

# 禁止 corepack 在 postCreateCommand 里弹交互提示
export COREPACK_ENABLE_DOWNLOAD_PROMPT=0

# 用当前用户 HOME，不要写死 /root
COREPACK_BIN_DIR="${HOME}/.local/bin"
PNPM_STORE_DIR="${HOME}/.pnpm-store"

mkdir -p "${COREPACK_BIN_DIR}" "${PNPM_STORE_DIR}"

# 根据 lock 文件检测包管理器并初始化
if [ -f "pnpm-lock.yaml" ]; then
  corepack enable --install-directory "${COREPACK_BIN_DIR}"
  pnpm config set store-dir "${PNPM_STORE_DIR}"
elif [ -f "yarn.lock" ]; then
  corepack enable --install-directory "${COREPACK_BIN_DIR}"
else
  echo "Using npm as default package manager"
fi
