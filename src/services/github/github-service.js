// flow
import { GithubRepo } from '../../models/GithubRepo';

const GITHUB_API_ENDPOINT = 'https://api.github.com/graphql';
const GITHUB_PERSONAL_ACCESS_TOKEN = 'fa1a1258fcc919bad18b42701238feb6b98e64e5';

export async function getPinnedRepos(username): Promise<GithubRepo> {
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
}