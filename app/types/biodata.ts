/**
 * Shape of the marriage biodata document at /biodata.
 *
 * Deliberately generic: the page is one loop over sections, so adding, removing
 * or reordering anything means editing app/data/biodata.ts and nothing else.
 *
 * This shares nothing with app/types/content.ts and should not be merged into
 * it — the portfolio content model and this document have separate lifetimes,
 * separate audiences and separate privacy rules. ImageRef is the one import,
 * and only because it describes an `<img>` rather than any of that.
 */

import type { ImageRef } from './content'

export interface BiodataField {
  label: string
  /** A string renders on one line. An array renders as a list. */
  value: string | string[]
}

export interface BiodataGroup {
  /** Heading for a repeated record — one degree, one sibling. Omit for a plain section. */
  title?: string
  fields: BiodataField[]
}

export interface BiodataSection {
  /** Anchor id, so a section can be linked to directly. */
  id: string
  title: string
  groups: BiodataGroup[]
}

export interface Biodata {
  fullName: string
  /** One line under the name, where the résumé sheet prints the job title. */
  subtitle?: string
  /** Opening paragraph on /biodata. Never printed — the sheet leads with the facts. */
  lede?: string
  /**
   * Portrait for both the page and the sheet. Its own image rather than
   * identity.photo, because the headshot an employer sees and the one a family
   * sees do not have to be the same picture. Delete it and both drop the
   * portrait — there is no separate switch.
   */
  photo?: ImageRef
  /**
   * Where modules/print-pdf.ts writes the printed copy. The link on
   * /biodata/print is also how the module learns the filename, so the two
   * cannot drift apart.
   */
  pdfFile: string
  /** ISO date. Printed in the footer so a forwarded copy carries its own age. */
  updatedAt: string
  sections: BiodataSection[]
}
