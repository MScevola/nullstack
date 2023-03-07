import Nullstack from 'nullstack'

export class Button extends Nullstack {
  render(props) {
    return (
      <button
        {...props}
        class={[
          'relative flex-none rounded-md text-sm font-semibold leading-6 py-1.5 px-3',
          'hover:bg-sky-400 bg-sky-500 text-white shadow-sm',
          'dark:shadow-highlight/20',
          props.class,
        ]}
      >
        {props.children}
      </button>
    )
  }
}
