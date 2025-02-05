from flask import Flask, jsonify
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

# Endpoint to check the status of the workers
@app.route('/keep_alive', methods=['POST'])
def check_status():
    print("Status Received Worker")
    return jsonify({'status': 'OK'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080,debug=True)



