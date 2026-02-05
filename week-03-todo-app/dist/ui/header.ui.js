import { getCurrentGreeting, formatDate } from "../utils/date.util";
import { getWeather } from "../services/weather.service";
const headerEl = document.getElementById("header");
export async function renderHeaderUI(name = "User") {
    headerEl.innerHTML = "";
    const greeting = document.createElement("h4");
    greeting.textContent = `${getCurrentGreeting()}, ${name}!`;
    const dateEl = document.createElement("p");
    dateEl.textContent = formatDate(new Date());
    const weatherEl = document.createElement("p");
    try {
        const weather = await getWeather(); // { temp: number, condition: string }
        weatherEl.textContent = `Weather: ${weather.temp}°C, ${weather.condition}`;
    }
    catch {
        weatherEl.textContent = "Weather info unavailable";
    }
    headerEl.append(greeting, dateEl, weatherEl);
}
//# sourceMappingURL=header.ui.js.map