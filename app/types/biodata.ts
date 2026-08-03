/**
 * Shape of the marriage biodata document at /biodata.
 *
 * Deliberately generic: the page is one loop over sections, so adding, removing
 * or reordering anything means editing app/data/biodata.ts and nothing else.
 *
 * This shares nothing with app/types/content.ts and should not be merged into
 * it — the portfolio content model and this document have separate lifetimes,
 * separate audiences and separate privacy rules.
 */

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
  /** ISO date. Printed in the footer so a forwarded copy carries its own age. */
  updatedAt: string
  sections: BiodataSection[]
}
