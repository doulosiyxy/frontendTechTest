//api client

const BASE_URL = "https://api.nasa.gov/planetary/apod";

export async function fetchData(key = '') {
    try {
        fetch(`${BASE_URL}?api_key=${key}`)
            .then(res => res.json())
            .then(data => {
                data
            })
    }
    catch (error) {
        console.error(error)
    }
}

