 export type Job = {
        id: number;
        title: string;
        company: string;
        location: string;
        type: string;
        salary: number;
        skills: string[];
        description: string;
        score?: number;
    };

    export type Filters = {
    title: string;
    location: string;
    type: string;
    salary: string;
};

export type SearchState = {
    filters: Filters;
    page: number;
}