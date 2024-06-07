#!/bin/sh

# Function to find and kill the process running on a specific port
kill_process_on_port() {
  PORT=$1
  PID=$(lsof -t -i :$PORT)
  if [ -n "$PID" ]; then
    echo "Killing process on port $PORT (PID: $PID)"
    kill -9 $PID
  else
    echo "No process found running on port $PORT"
  fi
}

# Function to kill the processes started by this script
cleanup() {
  echo "Cleaning up..."
  if [ -n "$BACKEND_PID" ]; then
    echo "Killing backend process (PID: $BACKEND_PID)"
    kill -9 $BACKEND_PID
  fi
  if [ -n "$FRONTEND_PID" ]; then
    echo "Killing frontend process (PID: $FRONTEND_PID)"
    kill -9 $FRONTEND_PID
  fi
}

# Trap the EXIT signal to ensure cleanup is called
trap cleanup EXIT

# Kill any process running on the default ports
kill_process_on_port 3000
kill_process_on_port 5000

# Navigate to the backend directory
cd backend

# Install dependencies for backend
npm install

# Start the backend server in the background and store the PID
PORT=3000 npm start &
BACKEND_PID=$!

# Navigate to the frontend directory
cd ../frontend

# Install dependencies for frontend
npm install

# Start the frontend server in the background and store the PID
PORT=5000 npm start &
FRONTEND_PID=$!

# Wait for both background jobs to finish
wait $BACKEND_PID
wait $FRONTEND_PID
