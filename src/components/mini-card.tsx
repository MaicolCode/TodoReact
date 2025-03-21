function MiniCardPresentation({ text }: { text: string }) {
    return (
      <div className='h-full w-full flex flex-col justify-center items-center text-xs text-zinc-400'>
        <span className='bg-neutral-100 dark:bg-neutral-800 p-3 rounded-md'>
          {text}
        </span>
      </div>
    )
  }

  export {MiniCardPresentation}