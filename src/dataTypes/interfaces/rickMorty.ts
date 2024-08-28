export interface IRickMorty {
    "id": number,
    "name": string,
    "status": string,
    "species": string,
    "type": null | string,
    "gender": string,
    "origin": {
        "name": string,
        "url": string
    },
    "location": {
        "name": string,
        "url": string
    },
    "image": string,
    "episode": null | string[],
    "url": string,
    "created": string
}

export interface IRickMortyBase {
    "info": {
        "count": number,
        "pages": number,
        "next": string | null,
        "prev": null | string
    },

    "results": IRickMorty[]
}