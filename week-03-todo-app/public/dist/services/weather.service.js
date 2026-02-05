export async function getWeather() {
    const url = "https://api.open-meteo.com/v1/forecast" +
        "?latitude=26.9124" +
        "&longitude=75.7873" +
        "&current_weather=true";
    const response = await fetch(url);
    const data = await response.json();
    return {
        temperature: Math.round(data.current_weather.temperature),
        condition: mapWeatherCodeToText(data.current_weather.weathercode)
    };
}
function mapWeatherCodeToText(code) {
    switch (code) {
        case 0: return "Clear";
        case 1:
        case 2:
        case 3: return "Partly Cloudy";
        case 45:
        case 48: return "Fog";
        case 51:
        case 53:
        case 55: return "Drizzle";
        case 61:
        case 63:
        case 65: return "Rain";
        case 71:
        case 73:
        case 75: return "Snow";
        case 95: return "Thunderstorm";
        default: return "Unknown";
    }
}
//# sourceMappingURL=weather.service.js.map