@echo off
title EasyQR
cd /d "%~dp0"
if not exist "node_modules" (
  echo Installing EasyQR for the first time...
  call npm install
)
echo Starting EasyQR...
call npm run dev -- --open
pause
