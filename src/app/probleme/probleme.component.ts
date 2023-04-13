import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './probleme';
import { ProblemeService } from './probleme.service';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css'],
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typesProbleme: ITypeProbleme[];
  errorMessage: String;
  constructor(
    private fb: FormBuilder,
    private typeproblemeService: ProblemeService
  ) {}

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: [
        '',
        [VerifierCaracteresValidator.longueurMinimum(3), Validators.required],
      ],
      nom: ['', [Validators.maxLength(50), Validators.required]],
      noProbleme: ['', Validators.required],
      noTypeProbleme: ['', Validators.required],
      courrielGroup: this.fb.group({
        courriel: [{ value: '', disabled: true }],
        courrielConfirmation: [{ value: '', disabled: true }],
      }),
      telephone: [{ value: '', disabled: true }],
    });

    this.typeproblemeService.obtenirTypesProbleme().subscribe(
      (typesProbleme) => (this.typesProbleme = typesProbleme),
      (error) => (this.errorMessage = <any>error)
    );
  }

  save(): void {}

  setNotification(notifyVia: string): void {
    const courrielGroupControl = this.problemeForm.get('courrielGroup');
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const telephoneControl = this.problemeForm.get('telephone');

    // Tous remettre à zéro (plus simple)
    courrielControl.clearValidators();
    courrielControl.reset(); // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    courrielControl.disable();
    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();
    courrielConfirmationControl.disable();
    telephoneControl.clearValidators();
    telephoneControl.reset(); // Pour enlever les messages d'erreur dûs à dirty, etc..
    telephoneControl.disable();
    
  }
}
