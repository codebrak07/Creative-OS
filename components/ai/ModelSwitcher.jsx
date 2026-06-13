import { useState } from 'react'
import styles from './ModelSwitcher.module.css'

export function ModelSwitcher({
  models = [],
  current,
  onChange,
  className = '',
  ...props
}) {
  const [open, setOpen] = useState(false)
  const currentModel = models.find((m) => m.id === current) || models[0]

  return (
    <div className={`${styles.wrap} ${className}`} {...props}>
      <button
        className={styles.switcherBtn}
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={styles.activeDot} />
        <span className={styles.currentName}>{currentModel?.name || 'Select Model'}</span>
        <span className={styles.arrow}>{open ? '▲' : '▼'}</span>
      </button>

      {open && models.length > 0 && (
        <ul className={styles.dropdown} role="listbox">
          {models.map((model) => (
            <li
              key={model.id}
              role="option"
              aria-selected={model.id === current}
              className={`${styles.item} ${model.id === current ? styles.activeItem : ''}`}
              onClick={() => {
                onChange?.(model.id)
                setOpen(false)
              }}
            >
              <div className={styles.itemHeader}>
                <span className={styles.itemName}>{model.name}</span>
                {model.id === current && <span className={styles.check}>✓</span>}
              </div>
              {model.description && (
                <span className={styles.itemDesc}>{model.description}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
