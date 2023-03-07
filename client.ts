import Nullstack from 'nullstack'
import Application from './src/Application'
import { ApplicationClientContext } from './src/types/ApplicationClientContext'

const context = Nullstack.start(Application) as ApplicationClientContext

context.start = async function start() {}

export default context
