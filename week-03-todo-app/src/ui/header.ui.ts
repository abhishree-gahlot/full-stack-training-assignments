import { getCurrentGreeting, formatDate } from "../utils/date.util.js";
import { getWeather } from "../services/weather.service.js";

const headerEl = document.getElementById("header")!;

export async function renderHeaderUI(name: string = "User"): Promise<void> {
    headerEl.innerHTML = "";

    const greeting = document.createElement("h4");
    greeting.textContent = `${getCurrentGreeting()}, ${name}!`;

    const dateEl = document.createElement("p");
    dateEl.textContent = formatDate(new Date());

    const weatherEl = document.createElement("p");
    try {
        const weather = await getWeather(); 
        weatherEl.textContent = `Weather: ${weather.temp}°C, ${weather.condition}`;
    } catch {
        weatherEl.textContent = "Weather info unavailable";
    }

    headerEl.append(greeting, dateEl, weatherEl);
}
