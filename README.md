# SDPP-Final

nvcc -gencode arch=compute_61,code=sm_61 md5.cu -o md5

# levantar infra

## levantar servidios redis y 'rabbitmq

cd .\SD2024 - david\tif\blockchain\services

docker build -t services:latest .

docker compose up --build

## levantar coordinador

cd .\SD2024 - david\tif\blockchain\coordinador

docker build -t coordinador:latest .

docker compose up --build

## levantar worker

cd .\SD2024 - david\tif\blockchain\worker

docker build -t worker_gpu_cpu:latest .

docker compose up --build
