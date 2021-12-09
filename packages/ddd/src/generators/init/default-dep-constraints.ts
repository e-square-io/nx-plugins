import { DepConstraint } from './../../utils';

export const DEFAULT_DEP_CONSTRAINTS: DepConstraint[] = [
  {
    sourceTag: 'type:app',
    onlyDependOnLibsWithTags: [
      'type:feature',
      'type:ui',
      'type:data-access',
      'type:util',
    ],
  },
  {
    sourceTag: 'type:feature',
    onlyDependOnLibsWithTags: ['type:ui', 'type:data-access', 'type:util'],
  },
  {
    sourceTag: 'type:ui',
    onlyDependOnLibsWithTags: ['type:ui', 'type:util'],
  },
  {
    sourceTag: 'type:data-access',
    onlyDependOnLibsWithTags: ['type:data-access', 'type:util'],
  },
  {
    sourceTag: 'type:util',
    onlyDependOnLibsWithTags: ['type:util'],
  },
];
