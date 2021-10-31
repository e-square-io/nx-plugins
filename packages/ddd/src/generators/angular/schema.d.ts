import { DDD } from '../../ddd';

export interface AngularGeneratorSchema extends DDD {
  style: string;
  changeDetection: string;
}
