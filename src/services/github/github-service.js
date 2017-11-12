// flow
import { GithubRepo } from '../../models/GithubRepo';

const PINNED_REPOS_MICRO_SERVICE_ENDPOINT = 'https://cors.now.sh/https://ls-vpnnynhzrz.now.sh/';

export async function getPinnedRepos(username): Promise<GithubRepo> {
  const result = await fetch(PINNED_REPOS_MICRO_SERVICE_ENDPOINT + `?username=${username}`);
  const pinnedRepos: GithubRepo[] = await result.json();

  return pinnedRepos;
}