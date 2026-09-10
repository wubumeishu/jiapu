@echo off
chcp 65001 >nul 2>&1
cd /d "H:\project\china-family-platform\frontend"
echo ========================================
echo 中国姓氏家谱平台 - 前端开发服务器
echo ========================================
echo.
echo 启动中...
echo 访问地址: http://localhost:5177/
echo.
npm run dev
