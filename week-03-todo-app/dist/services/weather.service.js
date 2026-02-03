// services/weather.service.ts
/**
 * Mock weather fetch function
 */
export async function getWeather() {
    // Simulate async API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                temp: 22,
                condition: "Sunny"
            });
        }, 500); // 0.5 sec delay
    });
}
//# sourceMappingURL=weather.service.js.map