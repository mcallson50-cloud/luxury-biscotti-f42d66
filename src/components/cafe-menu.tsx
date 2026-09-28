import { useState } from 'react'
import { Frame } from '@/components/media'
import { menu } from '@/data/collection'

const categories = [
  { key: 'coffee', label: 'COFFEE' },
  { key: 'beans', label: 'EXTRAS' },
  { key: 'nonCoffee', label: 'NON COFFEE' },
  { key: 'specials', label: 'BLASSA SPECIALS' },
] as const
type MenuItem = { name: string; price: string; note?: string }

export function CafeMenu() {
  const [active, setActive] = useState(0)
  const category = categories[active]
  const items: MenuItem[] = menu[category.key] ?? []
  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Menu categories">
          {categories.map((item, i) => (
            <button key={item.key} id={`menu-tab-${item.key}`} type="button" role="tab"
              aria-selected={active === i} aria-controls={`menu-panel-${item.key}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(event) => {
                const next = event.key === 'ArrowRight' ? (i + 1) % categories.length
                  : event.key === 'ArrowLeft' ? (i + categories.length - 1) % categories.length
                  : event.key === 'Home' ? 0 : event.key === 'End' ? categories.length - 1 : null
                if (next !== null) {
                  event.preventDefault()
                  setActive(next)
                  document.getElementById(`menu-tab-${categories[next].key}`)?.focus()
                }
              }}
              className="btn btn-ghost">
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-6" role="tabpanel" id={`menu-panel-${category.key}`}
          aria-labelledby={`menu-tab-${category.key}`} tabIndex={0}>
          <h3 className="t-heading text-[26px]">{category.label}</h3>
          <ul className="mt-5">
            {items.map((item, i) => (
              <li key={`${item.name}-${i}`} className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-3.5">
                <span className="text-[15px]">{item.name}
                  {item.note && <span className="mt-1 block text-[12px] text-ink-faint">{item.note}</span>}
                </span>
                <span className="text-[14px] text-ink-soft">{item.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Frame photo="menuIcedPour" ratio="tall" width={900} sizes="(min-width: 1024px) 30vw, 100vw" />
    </div>
  )
}
