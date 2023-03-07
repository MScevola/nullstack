class GitHubService {
  static bindStaticFunctions() {}

  async getUser(username: string) {
    const response = await fetch(`https://api.github.com/users/${username}`)
    const data = await response.json()

    return data
  }

  async getUserRepos(username: string) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`)
    const data = await response.json()

    return data
  }

  async getUserLangs(languages_url: string) {
    const response = await fetch(languages_url)
    const data = await response.json()

    return Object.entries(data)
      .sort(([_a, a], [_b, b]) => {
        return b - a
      })
      .map(([lang]) => lang)
  }

  async getUserPRs(username: string, repo: string) {
    const response = await fetch(`https://api.github.com/repos/${username}/${repo}/pulls`)
    const data = await response.json()

    return data.map((pull) => ({ login: pull.user.login, url: pull.html_url }))
  }
}

export const gitHub = new GitHubService()
