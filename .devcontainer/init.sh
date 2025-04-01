#!/bin/bash
# 如果定义了 REGISTRY_URL，则设置包管理器镜像源
if [ -n "${REGISTRY_URL}" ]; then
  npm config set registry "${REGISTRY_URL}"
fi

# 根据 lock 文件检测包管理器并初始化
if [ -f "pnpm-lock.yaml" ]; then
  corepack enable
  pnpm config set store-dir /root/.pnpm-store
elif [ -f "yarn.lock" ]; then
  corepack enable
else
  echo "Using npm as default package manager"
fi
