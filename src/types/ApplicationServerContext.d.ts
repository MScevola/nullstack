import { NullstackServerContext } from 'nullstack'
import { gitHub } from '../services/github'

export type ApplicationServerContext<T = {}> = NullstackServerContext<T & { gitHub: typeof gitHub }>
