import * as fromAlumnosState from './alumnos-state.reducer';
import { selectAlumnosStateState } from './alumnos-state.selectors';

describe('AlumnosState Selectors', () => {
  it('should select the feature state', () => {
    const result = selectAlumnosStateState({
      [fromAlumnosState.alumnosStateFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
