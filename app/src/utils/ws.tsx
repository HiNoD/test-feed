import { io } from "socket.io-client";

const TOKEN = '550e8400-e29b-41d4-a716-446655440000';
const WS_URL = `ws://k8s.mectest.ru/test-app/ws?token=${TOKEN}`;

let socket: WebSocket;

export const connectWS = (onMessage: (data: any) => void) => {
  socket = new WebSocket(WS_URL);

  socket.onopen = () => console.log("✅ WS Connected");
  
  socket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    onMessage(data);
  };

  socket.onerror = (e) => console.log("❌ WS Error:", e);
  
  socket.onclose = () => {
    console.log("🔌 WS Closed. Reconnecting...");
    setTimeout(() => connectWS(onMessage), 3000);
  };

  return socket;
};