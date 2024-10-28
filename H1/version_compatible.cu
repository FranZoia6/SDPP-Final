#include <stdio.h>
#include <cuda_runtime.h>

#define gpuErrchk(ans) { gpuAssert((ans), __FILE__, __LINE__); }
inline void gpuAssert(cudaError_t code, const char* file, int line) {
	if (code != cudaSuccess) {
    	fprintf(stderr, "GPUassert: %s en %s en la línea %d\n",
                     cudaGetErrorString(code), file, line);
    	exit(code);
	}
}

int main() {
    gpuErrchk(cudaDeviceSynchronize());
    return 0;
}
