import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function compteDixMots(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const commentaire = control.value;

    if (!commentaire) {
      return null;
    }
    const nbMots = commentaire.split(" ").length;
    const estValide = nbMots > 9 ? true : false

    return estValide ? null : { compteDixMots: true };
  };
}

export function nomDansCommentaire(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const commentaire = control.get('commentaire');
    const nom = control.get('nom');
    
    if (!commentaire?.value || !nom?.value) {
        return null;
    }
    const estValide = !commentaire.value.includes(nom.value);

    return estValide ? null : { nomDansCommentaire: true };
  };
}