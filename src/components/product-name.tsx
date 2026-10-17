export function ProductName({ name }: { name: string }) {
  const separator = name.indexOf('·')
  const product = (separator < 0 ? name : name.slice(0, separator)).trim()
  const nickname = separator < 0 ? '' : name.slice(separator + 1).trim()

  return (
    <>
      <span className="block whitespace-nowrap">{product}</span>
      {nickname ? <span className="block whitespace-nowrap">· {nickname}</span> : null}
    </>
  )
}
