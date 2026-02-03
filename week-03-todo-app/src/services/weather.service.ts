export interface Weather {
    temp: number;     
    condition: string; 
}


export async function getWeather(): Promise<Weather> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                temp: 22,
                condition: "Sunny"
            });
        }, 500); 
    });
}
