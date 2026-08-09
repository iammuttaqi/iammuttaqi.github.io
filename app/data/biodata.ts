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
  lede: 'Everything a family would reasonably want to know before starting a conversation — deen, education, work, family and what I am looking for. The same record is on the page and in the PDF.',

  photo: {
    src: '/images/biodata.webp',
    alt: 'Muntaser Muttaqi',
    width: 1024,
    height: 1024
  },

  pdfFile: '/biodata/muntaser-muttaqi-biodata.pdf',

  updatedAt: '2026-08-03',

  sections: [
    {
      id: 'basic',
      title: 'Basic information',
      groups: [
        {
          fields: [
            { label: 'Date of birth', value: birthLine(dateOfBirth) },
            { label: 'Height', value: '5\'7" (170 cm)' },
            { label: 'Blood group', value: 'B+' },
            { label: 'Marital status', value: 'Unmarried' },
            { label: 'Nationality', value: 'Bangladeshi' },
            { label: 'Address', value: ['Village: Nizkunjara, Samiti Bazar', 'Union: 10 No. Gopal Union', 'Upazila: Chhagalnaiya', 'District: Feni'] }
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
            { label: 'Salah', value: 'Five daily prayers, consistently' },
            { label: 'Jamaat', value: 'Mostly at home, sometimes at the mosque' },
            { label: 'Qur\'an recitation', value: 'Recites in part, with the focus on meaning and tafsir' },
            { label: 'Islamic education', value: ['Basic Quranic studies', 'Hadith studies'] },
            { label: 'Favourite scholars', value: ['Muhammad Enamul Haque', 'Dr. Shabir Ally', 'Shaykh Ahmadullah'] },
            { label: 'Beard', value: 'Kept — trimmed and styled' },
            { label: 'Music', value: 'Working towards giving it up completely.' }
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
            { label: 'Year', value: '2014' },
            { label: 'Result', value: 'Grade A' }
          ]
        },
        {
          title: 'Diploma',
          fields: [
            { label: 'Institution', value: 'Feni Computer Institute' },
            { label: 'Subject', value: 'Computer Science and Technology' },
            { label: 'Year', value: '2019' },
            { label: 'Note', value: 'A four-year diploma taken in place of HSC, and recognised as its equivalent.' }
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
            { label: 'Years of experience', value: experienceLine(careerStart) },
            { label: 'Monthly income', value: 'BDT 50,000-60,000' },
            { label: 'Income source', value: 'Halal' },
            {
              label: 'Future plans',
              value: [
                'Keep growing in software engineering',
                'Hold a balanced life alongside the work'
              ]
            }
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
            { label: 'Occupation', value: 'Retired teacher. Formerly Area Coordinator at United Trust; now Coordinator at Wahidur Rahman Eye Hospital.' }
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
          title: 'Younger Brother',
          fields: [
            { label: 'Name', value: 'Tofazzal Hossain' },
            { label: 'Age', value: '23' },
            { label: 'Occupation', value: 'Student — accounting, third year' },
            { label: 'Marital status', value: 'Unmarried' }
          ]
        },
        {
          title: 'Household',
          fields: [
            { label: 'Religious environment', value: 'Father, mother and brother are practising, with a focus on authentic Islamic knowledge.' },
            { label: 'Financial condition', value: 'Middle class' },
            { label: 'Family type', value: 'Nuclear family' },
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
              label: 'Hobbies and interests',
              value: [
                'Reading — self-development and books that teach something',
                'Exploring technology'
              ]
            },
            {
              label: 'On children',
              value: [
                'We would like children, in shaa Allah, without a long delay after marriage.',
                'General schooling for academics, with Qur\'an and the basics of deen taught at home from early on.',
                'Raising them is work we share, not something I hand over.'
              ]
            },
            { label: 'Smoking', value: 'Non-smoker.' },
            { label: 'Health', value: 'No conditions or disabilities.' }
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
            { label: 'Her marital status', value: 'Unmarried' },
            { label: 'Education', value: 'At least HSC or equivalent' },
            { label: 'Salah', value: 'Consistently performs the five daily prayers.' },
            { label: 'Islamic knowledge', value: 'Someone who tries to follow Islam sincerely.' },
            { label: 'Family background', value: 'Middle or upper-middle class' },
            {
              label: 'Qualities looked for',
              value: [
                'Kind, respectful and understanding',
                'Good character',
                'Values family',
                'Tries to follow Islam',
                'Communicates well'
              ]
            },
            { label: 'Working after marriage', value: 'Yes, if she wishes and it fits our family values.' },
            { label: 'Studying after marriage', value: 'Happy for us to keep learning and studying together.' },
            {
              label: 'Living arrangement',
              value: [
                'It depends on where work takes us, and on what my parents need as they get older.',
                'Not something I would settle without her, or settle once and never revisit.'
              ]
            },
            { label: 'Her family\'s location', value: 'Anywhere' }
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
            { label: 'Dowry', value: 'None expected, none accepted, in any form.' },
            { label: 'Mahr', value: 'As per Islamic guidelines.' },
            { label: 'Guardians ready to proceed', value: 'Yes — my parents know and have given their consent.' }
          ]
        }
      ]
    },

    {
      id: 'contact',
      title: 'Contact',
      groups: [
        {
          title: 'Me',
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
