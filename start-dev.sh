#!/bin/bash
# 中国姓氏家谱平台 - 前端开发服务器启动脚本

cd "$(dirname "$0")/frontend"

echo "========================================"
echo "中国姓氏家谱平台 - 前端开发服务器"
echo "========================================"
echo ""
echo "启动中..."
echo "访问地址: http://localhost:5177/"
echo ""

npm run dev
