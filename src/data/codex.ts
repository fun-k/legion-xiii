export interface Tenet {
  numeral: string
  title: string
  body: string
}

const codex: Array<Tenet> = [
  {
    numeral: 'I',
    title: 'Discipline Before Glory',
    body: 'A cohort that breaks formation for a hero\'s charge has already lost the field. Glory is written in the archive afterward, never chased during the battle.',
  },
  {
    numeral: 'II',
    title: 'The Record Outlives the Soldier',
    body: 'Every posting, promotion, and casualty is entered by lamplight before the ink of the dispatch has dried. What is not written down did not happen.',
  },
  {
    numeral: 'III',
    title: 'Hold the Line, Hold the Province',
    body: 'Haafingar answers to Castle Dour, and Castle Dour answers to the Elder Council. A hold left undefended is a debt the whole province eventually pays.',
  },
  {
    numeral: 'IV',
    title: 'Loyalty to the Dragonfire, Eternal',
    body: 'Storms come and holds change hands, but the oath sworn before the Dragonfire does not lapse with the weather. The XIII does not desert its post.',
  },
]

export default codex
