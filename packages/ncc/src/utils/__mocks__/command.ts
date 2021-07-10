import { of } from 'rxjs';

export const runNccCommand = jest.fn().mockReturnValue(of({ success: true }));
