export const Input = (context) => {
  return (
    <input
      {...context}
      class={[
        'w-full lg:flex items-center py-1.5 pl-2 pr-3 text-sm shadow-sm leading-6 rounded-md ring-1',
        'ring-slate-900/10 text-slate-400',
        'dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700',
        'hover:ring-slate-300',
      ]}
    />
  )
}
