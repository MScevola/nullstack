import Nullstack, { NullstackClientContext, NullstackNode } from 'nullstack'
import Logo from 'nullstack/logo'
import '../tailwind.css'
import { Home } from './Home'

interface LinkProps {
  href: string
}

declare function Head(): NullstackNode
declare function Link(context: LinkProps): NullstackNode

class Application extends Nullstack {
  prepare({ page }: NullstackClientContext) {
    page.locale = 'en-US'
  }

  renderHead() {
    return (
      <head>
        <link href="https://fonts.gstatic.com" rel="preconnect" />
        <link href="https://fonts.googleapis.com/css2?family=Crete+Round&family=Roboto&display=swap" rel="stylesheet" />
      </head>
    )
  }

  renderLink({ children, href }: NullstackClientContext<LinkProps>) {
    const link = `${href}?ref=create-nullstack-app`

    return (
      <a class="text-pink-500 ml-1" href={link} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  render() {
    return (
      <body class="dark font-roboto">
        <div class="bg-slate-100 text-black dark:bg-slate-900 dark:text-white p-4">
          <Head />

          <section class="w-full min-h-screen">
            <header class="container my-0 mx-auto">
              <Link href="https://nullstack.app/">
                <div class="ml-1">
                  <Logo height={60} light />
                </div>
              </Link>
              <h1 class="block font-crete-round tracking-widest font-bold text-lg mt-4">GitHub Profiler</h1>
            </header>

            <article class="container mt-6 mx-auto">
              <Home route="/" />
            </article>
          </section>
        </div>
      </body>
    )
  }
}

export default Application
