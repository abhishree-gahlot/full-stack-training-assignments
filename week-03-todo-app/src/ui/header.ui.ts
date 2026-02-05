import { getWeather } from "../services/weather.service.js";
import { formatDate } from "../utils/date.util.js";

const header = document.getElementById("header")!;

export async function renderHeaderUI(userName: string): Promise<void> {
    header.innerHTML = "";

    const greeting = document.createElement("h3");
    greeting.textContent = getGreeting(userName);

    const dateElement = document.createElement("p");
    dateElement.textContent = formatDate(new Date());

    const weatherElement = document.createElement("p");
    weatherElement.textContent = "Loading weather...";

    header.append(greeting, dateElement, weatherElement);

    const weather = await getWeather();
    try {
        const weather = await getWeather();
        weatherElement.textContent = `${weather.temperature}°C • ${weather.condition}`;
    }
    catch (error) {
        weatherElement.textContent = "Weather unavailable";
    }
}

function getGreeting(name: string): string {
    const hour = new Date().getHours();

    if (hour < 12) {
        return `Good Morning, ${name} ☀️`;
    }
    if (hour < 17) {
        return `Good Afternoon, ${name} 🌤`;
    }
    if (hour < 21) {
        return `Good Evening, ${name} 🌙`;
    }

    return `Good Night, ${name} 🌙`;
}
