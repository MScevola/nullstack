import Nullstack from 'nullstack'
import Application from './src/Application'
import { gitHub } from './src/services/github'
import { ApplicationServerContext } from './src/types/ApplicationServerContext'

const context = Nullstack.start(Application) as ApplicationServerContext<{ gitHub: typeof gitHub }>

context.start = async function start() {
  context.gitHub = gitHub
}

export default context
