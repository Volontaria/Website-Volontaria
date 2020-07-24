import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

export function manageFormError(form: FormGroup, errorResponse: HttpErrorResponse): void {
  Object.entries(errorResponse.error).forEach(([input, errors]) => {
    if (input === 'non_field_errors') {
      form.setErrors({ api: errors });
    } else {
      form.controls[input].setErrors({ api: errors });
    }
  });
}
