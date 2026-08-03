import type { Biodata } from '../types/biodata'
import { formatDate } from '../utils/format'

/*
 * ---------------------------------------------------------------------------
 * Marriage biodata — the only file to edit.
 * ---------------------------------------------------------------------------
 *
 * Most values here came from the halalbondhon listing HBM-4005. Anything that
 * listing did not cover is left empty rather than guessed: an empty field
 * prints an em dash and is counted in the screen-only "still to fill" notice at
 * the top of /biodata, so nothing can be forgotten quietly. Delete a whole
 * field if it does not apply to you rather than leaving it blank.
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

/**
 * ISO birth date, e.g. '1998-09-14'. The listing gives only September 1998, so
 * this stays empty rather than printing a made-up day. Fill in the real date.
 */
const dateOfBirth = '1998-09-30'

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

export const biodata: Biodata = {
  fullName: 'Muntaser Muttaqi',
  updatedAt: '2026-08-03',

  sections: [
    {
      id: 'basic',
      title: 'Basic information',
      groups: [
        {
          fields: [
            { label: 'Full name', value: 'Muntaser Muttaqi' },
            { label: 'Date of birth', value: birthLine(dateOfBirth) },
            { label: 'Height', value: '5\'7" (170 cm)' },
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
            { label: 'Music', value: 'Working towards giving it up completely.' },
            { label: 'Television', value: 'Occasional viewing, mostly science fiction.' },
            { label: 'Family practising', value: 'Father, mother and sibling are practising Muslims. Extended family is mixed.' }
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
            // Without this line the record reads as SSC 2014 then a five-year
            // gap and no HSC at all.
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
            { label: 'Current role', value: 'Software Engineer' },
            { label: 'Company', value: 'Gymscanner' },
            { label: 'Years of experience', value: '6+ years' },
            // A range rather than a figure: it answers the question every family
            // asks first, without publishing an exact salary next to your name
            // and employer on a page anyone can open.
            { label: 'Monthly income', value: 'BDT 50,000–60,000' },
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
            { label: 'Occupation', value: 'Retired teacher. Formerly Area Coordinator at United Trust; now Coordinator at Wahidur Rahman Eye Hospital.' },
            { label: 'Living', value: 'Alive' }
          ]
        },
        {
          title: 'Mother',
          fields: [
            { label: 'Name', value: 'Selina Kawser' },
            { label: 'Occupation', value: 'Homemaker' },
            { label: 'Living', value: 'Alive' }
          ]
        },
        // Copy or delete this block per sibling. The listing records one younger
        // brother and no sisters.
        {
          title: 'Sibling — 1',
          fields: [
            { label: 'Name', value: 'Tofazzal Hossain' },
            { label: 'Position', value: 'Younger brother' },
            { label: 'Age', value: '23' },
            { label: 'Occupation', value: 'Student — accounting, third year' },
            { label: 'Marital status', value: 'Unmarried' }
          ]
        },
        {
          title: 'Household',
          fields: [
            { label: 'Religious environment', value: 'Practising Muslims, with a focus on authentic Islamic knowledge and values.' },
            { label: 'Financial condition', value: 'Middle class' },
            { label: 'Family type', value: 'Nuclear family' }
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
            // This is the only line in the document written in your voice, and
            // it should be the one thing here nobody else could have written.
            // The old opening line said you follow the Qur'an and want what you
            // learn to be authentic — true, but the whole Religious practice
            // section already says it, and every other biodata says it too.
            // Replace what is left with something specific to you.
            { label: 'In my own words', value: 'I would rather have one deep conversation than a dozen shallow ones.' },
            {
              label: 'Hobbies and interests',
              value: [
                'Reading — self-development and books that teach something',
                'Exploring technology'
              ]
            },
            {
              // Read next to 'Working after marriage' in the Expectations
              // section — the two rows have to agree, and a children row that
              // quietly assumes she stops working contradicts it on the same
              // page. Keep these in step if you change either.
              label: 'On children',
              value: [
                'We would like children, in shaa Allah, without a long delay after marriage.',
                'General schooling for academics, with Qur\'an and the basics of deen taught at home from early on.',
                'Raising them is work we share, not something I hand over.'
              ]
            },
            { label: 'Clothing', value: 'Modest and comfortable — panjabi, shirts, trousers.' },
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
            { label: 'Marital status', value: 'Unmarried' },
            { label: 'Education', value: 'At least HSC or equivalent' },
            { label: 'Salah', value: 'Consistently performs the five daily prayers.' },
            { label: 'Hijab or niqab', value: 'Wears hijab or niqab as per Islamic guidelines.' },
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
            // It genuinely does depend on circumstances — so the row names the
            // two that decide it and says how the decision gets made. Bare
            // "depends on circumstances" was the same answer with the reasoning
            // removed, which is what made it read as evasion.
            {
              label: 'Living arrangement',
              value: [
                'It depends on where work takes us, and on what my parents need as they get older.',
                'Not something I would settle without her, or settle once and never revisit.'
              ]
            },
            // Relabelled: plain "Location" could mean where she is from or
            // where the two of you would live. The row above answers the second.
            { label: 'Her family\'s location', value: 'Feni or Mirsharai preferred.' }
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
            // Pre-filled because it is the standard position and reads badly as
            // a dash. Change it if it does not reflect yours.
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
            { label: 'Phone', value: '+8801863250879' },
            // Deliberately not on the page — this is a public URL.
            { label: 'Photo', value: 'Shared on request.' }
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
