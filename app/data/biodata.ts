import type { Biodata } from '../types/biodata'
import { formatDate } from '../utils/format'

/*
 * ---------------------------------------------------------------------------
 * Marriage biodata — the only file to edit.
 * ---------------------------------------------------------------------------
 *
 * This file feeds two pages: /biodata reads it as a web page, /biodata/print
 * lays the same data on an A4 sheet, and the PDF is printed from that sheet on
 * every build. There is nothing to keep in sync — edit here and all three move.
 *
 * Most values here came from the halalbondhon listing HBM-4005. Anything that
 * listing did not cover is left empty rather than guessed: an empty field
 * shows an em dash and is counted in the dev-only "still to fill" notice on
 * /biodata, so nothing can be forgotten quietly. Delete a whole field if it
 * does not apply to you rather than leaving it blank.
 *
 * A string renders on one line. An array renders as a list — use one for
 * anything that reads as several separate points.
 *
 * This page is not in the nav, not in the sitemap, and carries noindex plus a
 * robots.txt Disallow. It is still plain public HTML on GitHub Pages: anyone
 * with the URL can read it, and once it is committed it is in the git history
 * of a public repo permanently. The halalbondhon listing keeps the name and
 * phone numbers behind a login; this page will not. Do not put anything here
 * you would not hand to a stranger.
 */

/** ISO birth date. Drives both the printed date and the age below it. */
const dateOfBirth = '1998-09-30'

/** First month of full-time work. Drives the years-of-experience row. */
const careerStart = '2020-02'

/**
 * Age is worked out when the site is built, not when it is read, so it catches
 * up on the next deploy rather than on the birthday itself. Rebuild after one.
 */
function birthLine(iso: string): string {
  if (!iso) {
    return ''
  }

  const born = new Date(iso)
  const now = new Date()
  const hadBirthday = now.getMonth() > born.getMonth()
    || (now.getMonth() === born.getMonth() && now.getDate() >= born.getDate())
  const age = now.getFullYear() - born.getFullYear() - (hadBirthday ? 0 : 1)

  return `${formatDate(iso, true)} (age ${age})`
}

/**
 * Whole years and a plus sign, not "6 yrs 7 mos" — the question a family is
 * asking is how established he is, and the months are noise against that. Same
 * build-time caveat as the age above: it moves on the next deploy.
 */
function experienceLine(iso: string): string {
  const [year = 0, month = 1] = iso.split('-').map(Number)
  const now = new Date()
  const months = (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month)

  return `${Math.floor(months / 12)}+ years`
}

export const biodata: Biodata = {
  fullName: 'Muntaser Muttaqi',

  /** Sits where the résumé sheet prints the job title, in the same red line. */
  subtitle: 'Marriage biodata',

  /** Opening paragraph on the page. The printed sheet does not carry it. */
  lede: 'Personal, educational, professional, and family details along with partner expectations.',

  photo: {
    src: '/images/biodata.webp',
    alt: 'Muntaser Muttaqi',
    width: 1024,
    height: 1024
  },

  pdfFile: '/biodata/muntaser-muttaqi-biodata.pdf',

  updatedAt: '2026-08-29',

  sections: [
    {
      id: 'basic',
      title: 'Basic information',
      groups: [
        {
          fields: [
            { label: 'Date of birth', value: birthLine(dateOfBirth) },
            { label: 'Height', value: '5\'7" (170 cm)' },
            { label: 'Complexion', value: 'Light Brown' },
            { label: 'Blood group', value: 'B+' },
            { label: 'Address', value: 'Samiti Bazar, Nizkunjara, Chhagalnaiya, Feni' }
          ]
        }
      ]
    },

    {
      id: 'deen',
      title: 'Religious practice',
      groups: [
        {
          fields: [
            { label: 'Madhhab', value: 'Hanafi' },
            { label: 'Salah', value: 'Five daily prayers' },
            { label: 'Beard', value: 'Kept (trimmed)' }
          ]
        }
      ]
    },

    {
      id: 'education',
      title: 'Education',
      groups: [
        {
          title: 'SSC',
          fields: [
            { label: 'Institution', value: 'Nizkunjara High School' },
            { label: 'Group', value: 'Science' },
            { label: 'Year', value: '2014' }
          ]
        },
        {
          title: 'Diploma',
          fields: [
            { label: 'Institution', value: 'Feni Computer Institute' },
            { label: 'Subject', value: 'Computer Science and Technology' },
            { label: 'Year', value: '2019' }
          ]
        },
        {
          title: 'Bachelor\'s',
          fields: [
            { label: 'Institution', value: 'Northern University Bangladesh' },
            { label: 'Subject', value: 'Computer Science and Engineering' },
            { label: 'Year', value: '2023' }
          ]
        }
      ]
    },

    {
      id: 'profession',
      title: 'Profession',
      groups: [
        {
          fields: [
            { label: 'Occupation', value: 'Software Engineer' },
            { label: 'Workplace', value: 'Gymscanner' },
            { label: 'Work mode', value: 'Full-time (Remote)' },
            { label: 'Experience', value: experienceLine(careerStart) }
          ]
        }
      ]
    },

    {
      id: 'family',
      title: 'Family',
      groups: [
        {
          title: 'Father',
          fields: [
            { label: 'Name', value: 'Nurul Mostafa' },
            { label: 'Occupation', value: 'Retired teacher' }
          ]
        },
        {
          title: 'Mother',
          fields: [
            { label: 'Name', value: 'Selina Kawser' },
            { label: 'Occupation', value: 'Homemaker' }
          ]
        },
        {
          title: 'Younger brother',
          fields: [
            { label: 'Name', value: 'Tofazzal Hossain' },
            { label: 'Occupation', value: 'Student (Accounting, 4th Year)' }
          ]
        },
        {
          title: 'Household',
          fields: [
            { label: 'Financial condition', value: 'Middle class' },
            { label: 'Family type', value: 'Nuclear family' },
            { label: 'Living with', value: 'Parents and brother in our family residence' },
            { label: 'Home', value: 'Own house' }
          ]
        }
      ]
    },

    {
      id: 'personal',
      title: 'Personal',
      groups: [
        {
          fields: [
            {
              label: 'About me',
              value: 'Calm and thoughtful by nature, grounded in Islamic values, and focused on simple living, continuous learning, and family life.'
            },
            {
              label: 'Hobbies and interests',
              value: [
                // 'Reading (self-development & non-fiction)',
                // 'Travelling and exploring new places',
                'Building side software projects',
                'Engaging in meaningful conversations'
              ]
            },
            { label: 'Smoking', value: 'Non-smoker' },
            { label: 'Health', value: 'Sound health, no chronic conditions' }
          ]
        }
      ]
    },

    {
      id: 'expectations',
      title: 'Expectations from a spouse',
      groups: [
        {
          fields: [
            { label: 'Age', value: '20 to 25' },
            { label: 'Marital status', value: 'Unmarried' },
            { label: 'Education', value: 'HSC or above' },
            { label: 'Religious practice', value: 'Regular in prayers' },
            {
              label: 'Qualities looked for',
              value: [
                'Good character, respectful, and understanding',
                'Family-oriented with Islamic values',
                'Good communication'
              ]
            },
            { label: 'Working after marriage', value: 'Open, if mutually agreeable' },
            { label: 'Living arrangement', value: 'Flexible, based on work and family needs' }
          ]
        }
      ]
    },

    {
      id: 'terms',
      title: 'Marriage terms',
      groups: [
        {
          fields: [
            { label: 'Wedding ceremony', value: 'Simple Sunnah-compliant wedding without un-Islamic customs' },
            { label: 'Dowry', value: 'Strictly none' },
            { label: 'Mahr', value: 'As per Islamic guidelines' },
            { label: 'Expected timeline', value: 'Within 3 to 6 months after mutual understanding' },
            { label: 'Guardian consent', value: 'Yes, family is fully supportive and ready to proceed' }
          ]
        }
      ]
    },

    {
      id: 'contact',
      title: 'Contact',
      groups: [
        {
          title: 'Self',
          fields: [
            { label: 'Email', value: 'muntasermuttaqi@gmail.com' },
            { label: 'Phone', value: '+8801863250879' }
          ]
        },
        {
          title: 'Guardian',
          fields: [
            { label: 'Name', value: 'Selina Kawser' },
            { label: 'Relation', value: 'Mother' },
            { label: 'Phone', value: '+8801836730414' }
          ]
        }
      ]
    }
  ]
}

/**
 * Every field still empty, as "Section — Label". Drives the screen-only notice
 * on /biodata; never printed.
 */
export const unfilledFields = biodata.sections.flatMap(section =>
  section.groups.flatMap(group =>
    group.fields
      .filter(field => (Array.isArray(field.value) ? field.value.length === 0 : field.value.trim() === ''))
      .map(field => `${section.title} — ${group.title ? `${group.title}: ` : ''}${field.label}`)
  )
)
