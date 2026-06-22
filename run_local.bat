@echo off
title GridPulse Local Runner
echo ===================================================
echo   GridPulse: Predictive Congestion Mitigator
echo   Starting Backend and Frontend services...
echo ===================================================

:: Start Backend Server
echo.
echo [1/2] Launching backend FastAPI server...
start "GridPulse Backend" cmd /k "python run_server.py"

:: Start Frontend Server
echo.
echo [2/2] Launching frontend React app (Vite)...
cd frontend
npm run dev

pause
