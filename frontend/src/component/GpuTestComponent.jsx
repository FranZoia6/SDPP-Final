import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";

export default function GpuWorker() {
  const runningRef = useRef(false);
  const [ws, setWs] = useState(null);
  const { user } = useAuth0();

  useEffect(() => {
    // Conectar al WebSocket del backend
    const websocket = new WebSocket("ws://localhost:8888");

    websocket.onopen = () => {
      toast.success("Conectado al WebSocket");
    };

    websocket.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      toast.info("Mensaje recibido: Procesando...");

      const result = await processBlock(data);
      sendResult(result);
    };

    websocket.onerror = (error) => {
      toast.error("Error en WebSocket: " + error.message);
    };

    websocket.onclose = () => {
      toast.warn("Conexión WebSocket cerrada");
    };

    setWs(websocket);

    return () => websocket.close(); // Cerrar WebSocket al desmontar
  }, []);

  async function runWebGPU() {
    if (!navigator.gpu) {
      toast.error("WebGPU no está disponible en este navegador.");
      return;
    }
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      toast.error("No se pudo obtener un adaptador de GPU.");
      return;
    }
    const device = await adapter.requestDevice();
    toast.success("Worker GPU activo.");
  }

  async function processBlock(data) {
    let found = false;
    const startTime = performance.now();
    let hash = "";
    let randomNumber = "";

    while (!found) {
      randomNumber = Math.floor(Math.random() * data.random_num_max).toString();
      const combinedData = `${randomNumber}${data.base_string_chain}${data.blockchain_content}`;
      hash = enhancedHashGPU(combinedData);
      if (hash.toString().startsWith(data.prefix)) {
        found = true;
      }
    }
    const processingTime = (performance.now() - startTime) / 1000;
    return {
      ...data,
      hash,
      number: randomNumber,
      processing_time: processingTime,
      user_id: user.sub,
    };
  }

  function enhancedHashGPU(data) {
    let hashVal = 0;
    for (let i = 0; i < data.length; i++) {
      hashVal = (hashVal * 31 + data.charCodeAt(i)) % 2 ** 32;
      hashVal ^= ((hashVal << 13) | (hashVal >>> 19)) >>> 0; // Rotación de bits
      hashVal = (hashVal * 17) % 2 ** 32;
      hashVal = ((hashVal << 5) | (hashVal >>> 27)) >>> 0;
    }
    return hashVal.toString(16).padStart(8, "0");
  }

  function sendResult(data) {
    fetch("http://localhost:8090/solved_task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then((text) => toast.success("Resultado enviado: " + text))
      .catch((err) => toast.error("Error enviando resultado: " + err));
  }

  return (
    <button onClick={runWebGPU} style={{ padding: "10px", fontSize: "16px" }}>
      Worker GPU
    </button>
  );
}
