export interface Officer {
  id: string
  rank: string
  name: string
  post: string
  since: string
  record: string
  quote: string
  featured?: boolean
}

const officers: Array<Officer> = [
  {
    id: 'ferrenza',
    rank: 'General',
    name: 'Ancus Ferrenza',
    post: 'Commanding General, XIII Legion — Lord Warden of Castle Dour',
    since: 'In command since 4E 198',
    record:
      'Raised through the ranks at the siege of Sancre Tor before transferring to the Skyrim command. Oversees every cohort garrisoned between Solitude and the Reach, and answers directly to the Emperor\'s Elder Council.',
    quote:
      'Thirty years under the Dragon banner have taught me one lesson: an empire that forgets its dead is already halfway to ruin.',
    featured: true,
  },
  {
    id: 'aureus',
    rank: 'Legate',
    name: 'Corvina Aureus',
    post: 'Legate of the Field — Second in Command',
    since: 'Commissioned 4E 201',
    record:
      'Directs the standing cohorts and field logistics for the whole of Haafingar and the western holds. Known among the rank and file for reading every muster roll herself before a campaign is approved.',
    quote:
      'A legion is not its swords. It is the ledger that says where those swords are, and why.',
  },
  {
    id: 'vail',
    rank: 'Tribune',
    name: 'Petronius Vail',
    post: 'Tribune of the Archive — Keeper of Records',
    since: 'Appointed 4E 199',
    record:
      'Custodian of the Castle Dour archive itself: correspondence, campaign ledgers, and the muster rolls of every soldier to serve the XIII since its founding. No promotion is finalized without his seal.',
    quote:
      'Burn a fort and it can be rebuilt in a season. Burn its records and you have erased the men who died holding it.',
  },
  {
    id: 'skoril',
    rank: 'Tribune',
    name: 'Dagny Skoril',
    post: 'Tribune of the Watch — Officer of the Garrison',
    since: 'Appointed 4E 202',
    record:
      'A Nord of Haafingar who took the Imperial oath after the frost wolves took her steading. Commands the night watch along the city walls and the archive\'s own guard.',
    quote:
      'I did not swear to the Empire. I swore to the people it is supposed to protect. The oath holds regardless.',
  },
]

export default officers
