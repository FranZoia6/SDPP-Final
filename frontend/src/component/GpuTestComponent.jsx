import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";

export default function GpuWorker() {
  const runningRef = useRef(false);
  const [ws, setWs] = useState(null);
  const { user } = useAuth0();
  const workerIdRef = useRef(`worker-${Math.random().toString(36).substring(7)}`); // ID persistente

  useEffect(() => {
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

    return () => websocket.close();
  }, []);

  useEffect(() => {
    const keepAlive = () => {
      fetch("http://localhost:8092/keep_alive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ worker_id: workerIdRef.current }), // Usa el mismo worker_id
      })
        .then((res) => res.text())
        .then((text) => console.log("Keep alive response:", text))
        .catch((err) => console.error("Error en keep_alive:", err));
    };

    keepAlive(); // Ejecutar inmediatamente
    const interval = setInterval(keepAlive, 10000); // Cada 10 segundos

    return () => clearInterval(interval); // Limpieza cuando el componente se desmonta
  }, []);

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
      hashVal ^= ((hashVal << 13) | (hashVal >>> 19)) >>> 0;
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
    <button onClick={() => toast.info("Worker activo")} style={{ padding: "10px", fontSize: "16px" }}>
      Worker GPU
    </button>
  );
}
