const fetch = require('node-fetch');
const URL = require('url');

const GITHUB_API_ENDPOINT = 'https://api.github.com/graphql';
const GITHUB_PERSONAL_ACCESS_TOKEN = '<YOUR_GITHUB_TOKEN>';

function getPinnedReposQuery(username) {
    const graphQuery = `
    query {
        repositoryOwner(login: "${username}") {
          ... on User {
            pinnedRepositories(first: 6) {
              edges {
                node {
                  name
                  description
                  url
                  languages(first: 3) {
                    edges {
                      node {
                        name
                        color
                      }
                    }
                  }
                  stargazers {
                    totalCount
                  }
                  forks {
                    totalCount
                  }
                }
              }
            }
          }
        }
      }`;

    return graphQuery;
}

module.exports = async (req) => {
    const username = URL.parse(req.url, true).query.username;
    const graphQuery = getPinnedReposQuery(username);
    const result = await fetch(GITHUB_API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Authorization': 'bearer ' + GITHUB_PERSONAL_ACCESS_TOKEN
        },
        body: JSON.stringify({ 'query': graphQuery })
    });

    const parsedResult = await result.json();
    const { repositoryOwner } = parsedResult.data;
    const { pinnedRepositories } = repositoryOwner;

    return pinnedRepositories.edges.map(repoEdge => {
        const repoNode = repoEdge.node;
        return {
            name: repoNode.name,
            url: repoNode.url,
            description: repoNode.description,
            forksCount: repoNode.forks.totalCount,
            stargazersCount: repoNode.stargazers.totalCount,
            languages: repoNode.languages.edges.map(languageEdge => {
                return {
                    name: languageEdge.node.name,
                    color: languageEdge.node.color
                }
            })
        }
    });    
};