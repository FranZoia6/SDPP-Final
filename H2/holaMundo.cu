global void holaMundo() {
    printf("Hola Mundo desde el GPU!\n");
}

int main() {
    // Lanzar el kernel
    holaMundo<<<1, 10>>>();
    cudaError_t err = cudaGetLastError();
    if (err != cudaSuccess) {
        std::cerr << "Error: " << cudaGetErrorString(err) << std::endl;
    }
    cudaDeviceSynchronize(); // Esperar a que el GPU termine
    return 0;
} 