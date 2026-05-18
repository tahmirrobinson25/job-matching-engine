const jobTitles  = {
    'software engineer': [
        "software developer", 
        "sr. software engineer", 
        "jr. software engineer",
        "senior software engineer",
        "junior software engineer",
        "staff engineer",
        "full stack engineer",
        "full stack developer",
    ],

    'frontend engineer': [
        "frontend developer", 
        "web developer", 
        "react developer",
        "full-stack developer",
        "junior front-end developer"
    ],

    'game developer': [
        "game designer"
    ]
};

export const normalizeSynonyms = (title: string) => {
    const cleanedTitle = title.toLowerCase().trim();

    for ( const [searchedTitle, synonyms] of Object.entries(jobTitles))
    {
        if (
            cleanedTitle === searchedTitle || synonyms.includes(cleanedTitle)

        ) {
            return searchedTitle;
        }
    }

    return cleanedTitle;
}