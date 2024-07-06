import { HTTPURL } from "../contatnt/Matcher";

export async function add_data(data) {
    try {
        const response = await fetch(HTTPURL + 'api/add-data', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export async function get_data() {
    try {
        const response = await fetch(HTTPURL + 'api/get-data');
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export async function get_country() {
    try {
        const response = await fetch(HTTPURL + 'api/get-country');
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export async function get_state(id) {
    try {
        const response = await fetch(HTTPURL + `api/get-state/?id=${id}`);
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export async function get_city(id) {
    try {
        const response = await fetch(HTTPURL + `api/get-city/?id=${id}`);
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}