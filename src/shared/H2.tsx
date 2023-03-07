import Nullstack from 'nullstack'

class H2 extends Nullstack {
  render(props) {
    return <h2 class="text-3xl font-bold">{props.children}</h2>
  }
}

export default H2
