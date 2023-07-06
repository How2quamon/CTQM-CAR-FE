import http from ".."

async function getAll() {

    const { data } = await http.get<any>("all");
    return data;
}


const contriesService = {
    getAll
}

export default contriesService;