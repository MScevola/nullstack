import Nullstack from 'nullstack'
import { Button } from './shared/Button'
import H2 from './shared/H2'
import { Input } from './shared/Input'
import { ApplicationClientContext } from './types/ApplicationClientContext'
import { ApplicationServerContext } from './types/ApplicationServerContext'

interface HomeProps {}

interface GitHubUserData {
  username: string
  name: string
  picture: string
  stars: number
  languages: string[]
  repos: string[]
}

interface GetUserProps {
  username: string
}

interface GetUserPRsProps {
  username: string
  repo: string
  login?: string
  url?: string
}

export class Home extends Nullstack<HomeProps> {
  search = ''
  user: GitHubUserData
  userPRs: GetUserPRsProps[]

  static async getUser(context: GetUserProps) {
    const { gitHub, username } = context as ApplicationServerContext<GetUserProps>

    const userData = await gitHub.getUser(username)
    const userRepoData = await gitHub.getUserRepos(username)
    // I limited the size of repos to prevent it to exceed the number of requests allowed without authentication
    const userLanguages = await Promise.all(
      userRepoData.slice(0, 3).map(async (language) => {
        return await gitHub.getUserLangs(language.languages_url)
      }),
    )

    return {
      username,
      name: userData.name,
      picture: userData.avatar_url,
      stars: userRepoData.reduce((acc, repo) => acc + repo.stargazers_count, 0),
      languages: userLanguages.flat(),
      repos: userRepoData.sort((a, b) => b.stargazers_count - a.stargazers_count).map((repo) => repo.name),
    } as GitHubUserData
  }

  static async listUserPRs(context: GetUserPRsProps): Promise<GetUserPRsProps[]> {
    const { gitHub, username, repo } = context as ApplicationServerContext<GetUserPRsProps>
    const userPRs = await gitHub.getUserPRs(username, repo)

    return userPRs
  }

  async searchPRs({ username, repo }) {
    this.userPRs = undefined
    this.userPRs = await Home.listUserPRs({ username, repo })
  }

  prepare({ project, page }: ApplicationClientContext<HomeProps>) {
    page.title = `${project.name}`
    page.description = `${project.name} was made with Nullstack`
  }

  async searchUser() {
    this.user = undefined
    this.user = await Home.getUser({ username: this.search })
  }

  render({ worker }: ApplicationClientContext) {
    const loading = !!worker.queues.getUser?.length
    const loadingPRs = !!worker.queues.getUserPRs?.length

    return (
      <section class="w-full min-h-screen">
        <form onsubmit={this.searchUser} class="flex gap-2">
          <div class="flex-1">
            <Input bind={this.search} spellcheck="false" autofocus placeholder="GitHub username here..." />
          </div>

          <div>
            <Button type="submit" disabled={loading} class={loading ? 'animate-spin' : null}>
              {loading ? 'Loading' : 'Get'}
            </Button>
          </div>
        </form>

        {loading ? <div>Loading</div> : null}

        {this.user && (
          <section>
            <section class="flex gap-4 items-center justify-center py-8">
              <div>
                <img alt="" src={this.user.picture} width={450} height={450} />
              </div>

              <div class="flex flex-1">
                <div>
                  <H2>{this.user.name}</H2>

                  <div>{this.user.stars} ⭐</div>

                  <div class="py-4">
                    <h4>MOST USED LANGUAGES:</h4>
                    <ul>
                      {this.user.languages.map((lang) => (
                        <li>{lang}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section class="flex gap-4">
              <ul>
                {this.user.repos.map((repo) => (
                  <li>
                    <button repo={repo} username={this.user.username} onclick={this.searchPRs}>
                      {repo}
                    </button>
                  </li>
                ))}
              </ul>

              <ul>
                {loadingPRs ? (
                  <li>Loading</li>
                ) : (
                  <>
                    {' '}
                    {this.userPRs?.length > 0 ? (
                      this.userPRs.map((pull) => (
                        <li>
                          <span>{pull.login} - </span>
                          <a target="_blank" class="underline hover:text-blue-200" href={pull.url}>
                            {pull.url}
                          </a>
                        </li>
                      ))
                    ) : (
                      <li>
                        <em>No PR found for this repository</em>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </section>
          </section>
        )}
      </section>
    )
  }
}
