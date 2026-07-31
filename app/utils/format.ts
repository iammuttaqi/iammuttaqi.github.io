/** Formats an ISO-ish date ("2026-05", "2026-05-18") as "May 2026" / "18 May 2026". */
export function formatDate(value: string, withDay = false): string {
  const parts = value.split('-').map(Number)
  const [year, month = 1, day = 1] = parts as [number, number?, number?]
  const date = new Date(Date.UTC(year, month - 1, day))

  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'short',
    ...(withDay || parts.length === 3 ? { day: 'numeric' } : {})
  }).format(date)
}

/** "Feb 2023 — Jun 2026" or "Feb 2023 — Present". */
export function formatRange(start: string, end?: string): string {
  return `${formatDate(start)} — ${end ? formatDate(end) : 'Present'}`
}

/** Rough duration between two dates, e.g. "3 yrs 4 mos". */
export function formatDuration(start: string, end?: string): string {
  const [startYear = 0, startMonth = 1] = start.split('-').map(Number)
  const endDate = end ? end.split('-').map(Number) : [new Date().getFullYear(), new Date().getMonth() + 1]
  const [endYear = 0, endMonth = 1] = endDate

  const months = Math.max(0, (endYear - startYear) * 12 + (endMonth - startMonth)) + 1
  const years = Math.floor(months / 12)
  const remainder = months % 12

  return [years ? `${years} yr${years > 1 ? 's' : ''}` : '', remainder ? `${remainder} mo${remainder > 1 ? 's' : ''}` : '']
    .filter(Boolean)
    .join(' ')
}

/** 191000 → "191k", 1_400_000 → "1.4M". */
export function formatCompact(value: number): string {
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(value)
}

/** Current time in a given IANA timezone, e.g. "14:32". */
export function formatTimeIn(timezone: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(new Date())
}

export function absoluteUrl(path: string, domain: string): string {
  return `${domain.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`
}
