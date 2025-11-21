export interface PatchNote {
  version: string;
  date: string;
  category: 'contract' | 'worker' | 'general';
  title: string;
  description: string;
  type: 'feature' | 'bugfix' | 'improvement';
}

export type PatchNoteCategory = PatchNote['category'];
export type PatchNoteType = PatchNote['type'];
