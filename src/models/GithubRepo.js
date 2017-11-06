// flow

export interface GithubRepoLanguage {
    name: String;
    color: String;
}

export interface GithubRepo {
    name: String;
    url: String;
    description: String;
    languages: GithubRepoLanguage[];
    stargazersCount: Number;
    forksCount: Number;
}