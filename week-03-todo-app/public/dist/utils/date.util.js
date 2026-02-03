export function getCurrentGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12)
        return "Good Morning";
    if (hour >= 12 && hour < 17)
        return "Good Afternoon";
    if (hour >= 17 && hour < 21)
        return "Good Evening";
    return "Good Night";
}
export function formatDate(date) {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
    };
    return date.toLocaleDateString(undefined, options);
}
//# sourceMappingURL=date.util.js.map