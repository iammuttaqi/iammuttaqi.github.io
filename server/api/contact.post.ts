interface ContactPayload {
  name?: string
  email?: string
  subject?: string
  message?: string
  website?: string
  elapsedMs?: number
}

/** Naive in-memory rate limit: enough to stop casual abuse on a single instance. */
const attempts = new Map<string, { count: number, resetAt: number }>()
const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 5

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const record = attempts.get(ip)

  if (!record || record.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }

  record.count += 1

  return record.count > MAX_ATTEMPTS
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactPayload>(event)
  const ip = getRequestHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim()
    ?? event.node.req.socket.remoteAddress
    ?? 'unknown'

  // Honeypot: only bots fill a field humans cannot see.
  if (body.website) {
    return { ok: true }
  }

  // Anything submitted in under 3 seconds was not typed by a person.
  if (typeof body.elapsedMs === 'number' && body.elapsedMs < 3000) {
    return { ok: true }
  }

  if (rateLimited(ip)) {
    throw createError({ statusCode: 429, message: 'Too many messages. Try again later or email me directly.' })
  }

  const name = body.name?.trim() ?? ''
  const email = body.email?.trim() ?? ''
  const subject = body.subject?.trim() ?? ''
  const message = body.message?.trim() ?? ''

  if (name.length < 2 || subject.length < 3 || message.length < 20 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 422, message: 'Please fill in every field.' })
  }

  const config = useRuntimeConfig(event)

  // Delivery: set NUXT_CONTACT_WEBHOOK_URL to a Slack/Discord/email-relay endpoint.
  // Without it the submission is logged server-side so nothing is silently dropped.
  if (config.contactWebhookUrl) {
    await $fetch(config.contactWebhookUrl, {
      method: 'POST',
      body: {
        text: `New portfolio message\nFrom: ${name} <${email}>\nSubject: ${subject}\n\n${message}`
      }
    })
  } else {
    console.info('[contact] message received', { name, email, subject, message })
  }

  return { ok: true }
})
