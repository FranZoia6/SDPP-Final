# SDPP-Final

nvcc -gencode arch=compute_61,code=sm_61 md5.cu -o md5

# levantar infra

## levantar servidios redis y 'rabbitmq

cd .\SD2024 - david\tif\blockchain\services

docker network create red_ej2

docker compose up --build

## levantar coordinador

cd ".\SD2024 - david\tif\blockchain\coordinador"

docker build -t coordinador:latest .

docker compose up --build

## levantar worker

cd ".\SD2024 - david\tif\blockchain\worker"

docker build -t worker_gpu_cpu:latest .

Instalar NVIDIA Container Toolkit, para ello véase https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html

docker compose up --build
