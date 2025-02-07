from flask import Flask, jsonify, request
import pika
import os
import sys

# Get the current script's directory
current_dir = os.path.dirname(os.path.abspath(__file__))
# Get the parent directory
parent_dir = os.path.dirname(current_dir)

print("Parent Directory:", parent_dir)
sys.path.append(parent_dir)

from redis_utils import RedisUtils
redis_utils = RedisUtils()

# Connect to RabbitMQ server
connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbit1', port=5672, credentials=pika.PlainCredentials('rabbitmq', 'rabbitmq')))

channel = connection.channel()

# Declare queues
channel.queue_declare(queue='workers_queue')

# Declare the topic exchange
channel.exchange_declare(exchange='workers_queue', exchange_type='topic', durable=True)

# --- APP side --- 
app = Flask(__name__)

@app.route('/keep_alive', methods=['POST'])
def check_status():
    data = request.get_json()
    worker_id = data.get("worker_id")  # Obtener el ID del worker desde el body

    if not worker_id:
        return jsonify({'error': 'Missing worker_id'}), 400

    # Verificar si el worker ya existe en Redis
    if redis_utils.exists_worker(worker_id):
        print(f"Worker {worker_id} refreshed")
    else:
        print(f"New worker {worker_id} registered")

    # Guardar o actualizar el worker con TTL de 30s
    redis_utils.setex(f"workers:{worker_id}", 15, "alive")

    return jsonify({'status': 'OK'})

def get_active_workers():
    """Devuelve una lista de workers activos en Redis."""
    keys = redis_utils.keys("workers:*")
    return [key.decode().split(":")[1] for key in keys]  # Extraer solo los IDs


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080,debug=True)



