import { DepConstraint, DepConstraintTag } from './../../utils';

export const DEFAULT_DEP_CONSTRAINTS: DepConstraint[] = [
  {
    sourceTag: DepConstraintTag.Application,
    onlyDependOnLibsWithTags: [
      DepConstraintTag.Feature,
      DepConstraintTag.UI,
      DepConstraintTag.DataAccess,
      DepConstraintTag.Util,
    ],
  },
  {
    sourceTag: DepConstraintTag.Feature,
    onlyDependOnLibsWithTags: [
      DepConstraintTag.Feature,
      DepConstraintTag.UI,
      DepConstraintTag.DataAccess,
      DepConstraintTag.Util,
    ],
  },
  {
    sourceTag: DepConstraintTag.UI,
    onlyDependOnLibsWithTags: [
      DepConstraintTag.UI,
      DepConstraintTag.DataAccess,
      DepConstraintTag.Util,
    ],
  },
  {
    sourceTag: DepConstraintTag.DataAccess,
    onlyDependOnLibsWithTags: [
      DepConstraintTag.DataAccess,
      DepConstraintTag.Util,
    ],
  },
  {
    sourceTag: DepConstraintTag.Util,
    onlyDependOnLibsWithTags: [DepConstraintTag.Util],
  },
];
