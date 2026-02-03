export async function getWeather() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                temp: 22,
                condition: "Sunny"
            });
        }, 500);
    });
}
//# sourceMappingURL=weather.service.js.map