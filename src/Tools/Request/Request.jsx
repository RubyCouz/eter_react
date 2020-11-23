export default function (data, xsrf) {
    return fetch('https://localhost:8000/api/graphql', {
        body:JSON.stringify(data),
        credentials: "include", 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-XSRF-TOKEN': xsrf,
        }
    })
    .then((response) => {
        return response.json()
    })
}