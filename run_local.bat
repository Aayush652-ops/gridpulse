@echo off
title GridPulse Local Runner
echo ===================================================
echo   GridPulse: Predictive Congestion Mitigator
echo   Starting Backend and Frontend services...
echo ===================================================

:: Load environment variables from .env file if it exists
if exist .env (
    echo Loading environment variables from .env ...
    for /f "usebackq tokens=1,* delims==" %%i in (`findstr /v "^#" .env`) do (
        set "%%i=%%j"
    )
)

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

