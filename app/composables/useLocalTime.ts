/**
 * The "what time is it where he is" clock in the hero and on /contact.
 *
 * Ticks every 30s, which is plenty for a readout that only shows hours and
 * minutes. Both call sites wrap it in <ClientOnly>, since the server has no
 * business rendering a clock into static HTML.
 */
export function useLocalTime(timezone: string) {
  // Prerendering emits the <ClientOnly> fallback, so formatting on the server
  // is work whose result is thrown away.
  const localTime = ref(import.meta.server ? '' : formatTimeIn(timezone))
  let timer: ReturnType<typeof setInterval> | undefined

  onMounted(() => {
    timer = setInterval(() => {
      localTime.value = formatTimeIn(timezone)
    }, 30_000)
  })

  onBeforeUnmount(() => clearInterval(timer))

  return localTime
}
