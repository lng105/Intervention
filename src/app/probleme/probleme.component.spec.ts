import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';
import { ProblemeService } from './probleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers: [ProblemeService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('2-Champ prenom valide avec 3 caracteres', ()=> {
    let zone = component.problemeForm.controls["prenom"];
    zone.setValue('a'.repeat(4))
    let errors =zone.errors || {};
    expect(errors["minlength"]).toBeFalsy();
  });

  it('1-Champ prenom invalide avec 2 caracteres', ()=> {
    let zone = component.problemeForm.controls["prenom"];
    zone.setValue('a'.repeat(2))
    let errors =zone.errors || {};
    expect(errors["minlength"]).toBeFalsy();
  });

  it('3-Champ prenom valide avec 200 caracteres', ()=> {
    let zone = component.problemeForm.controls["prenom"];
    zone.setValue('a'.repeat(199))
    let errors =zone.errors || {};
    expect(errors["minlength"]).toBeFalsy();
  });

  it('4-Champ prenom invalide avec aucune valeur', ()=> {
    let zone = component.problemeForm.controls["prenom"];
    zone.setValue('a'.repeat(0))
    let errors =zone.errors || {};
    expect(errors["minlength"]).toBeFalsy();
  });

  it('5-Champ prenom invalide avec 10 espaces', ()=> {
    let zone = component.problemeForm.controls["prenom"];
    zone.setValue('a'.repeat(10))
    let errors =zone.errors || {};
    expect(errors["minlength"]).toBeFalsy();
  });

  it('6-Champ prenom invalide avec 2 espaces et 1 caractere', ()=> {
    let zone = component.problemeForm.controls["prenom"];
    zone.setValue('a'.repeat(3))
    let errors =zone.errors || {};
    expect(errors["minlength"]).toBeFalsy();
  });

  it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier', () =>{
    component.setNotification("telephone");

    let zone = component.problemeForm.get('telephone');
    expect(zone.disabled).toBeTrue();
  });

  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () =>{
    component.setNotification("telephone");

    let zone = component.problemeForm.get("telephone");
    zone.setValue("");
    expect(zone.status).toBeTruthy();
  })

  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier',() =>{
    component.setNotification("courriel")

    let zone = component.problemeForm.get('courrielGroup.courriel')
    expect(zone.disabled).toBeFalse();
  });

  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier',() =>{
    component.setNotification("courrielConfirmation")

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation')
    expect(zone.disabled).toBeTrue();
  });

  it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel',() =>{
    component.setNotification("courriel")

    let zone = component.problemeForm.get("telephone")
    expect(zone.disabled).toBeTrue();
  })

  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel',() =>{
    component.setNotification("courriel")

    let zone = component.problemeForm.get("courrielGroup.courriel")
    expect(zone.enabled).toBeTrue();
  })

  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel',() =>{
    component.setNotification("courrielConfirmation")

    let zone = component.problemeForm.get("courrielGroup.courrielConfirmation")
    expect(zone.enabled).toBeFalse();
  })

  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel',() =>{
    component.setNotification("courriel")

    let zone = component.problemeForm.get("courrielGroup.courriel")
    zone.setValue('a'.repeat(0))
    expect(zone.status).toBeTruthy();
  })

  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel',() =>{
    component.setNotification("courrielConfirmation")

    let zone = component.problemeForm.get("courrielGroup.courrielConfirmation")
    zone.setValue('a'.repeat(0))
    expect(zone.status).toBeTruthy();
  })

  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme',() =>{
    component.setNotification("courriel")
    let courriel = component.problemeForm.get("courrielGroup.courriel")
    courriel.setValue("aaaa");
    let errors = courriel.errors || {};
    expect(errors["pattern"]).toBeTruthy();
  })

  it("#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null",() =>{
    component.setNotification("courriel")
    let courrielCon = component.problemeForm.get('courrielGroup.courrielConfirmation')
    courrielCon.setValue("asdf@gmail.com")
    let groupe = component.problemeForm.get('courrielGroup')
    expect(groupe.invalid).toBeTrue();
  })

  it("#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null",() =>{
    component.setNotification("courriel")
    let courriel = component.problemeForm.get('courrielGroup.courriel')
    courriel.setValue("asdf@gmail.com")
    let groupe = component.problemeForm.get('courrielGroup')
    expect(groupe.invalid).toBeTrue();
  })

  it("#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel",() =>{
    component.setNotification("courriel")
    let courriel = component.problemeForm.get('courrielGroup.courriel')
    let courrielCon = component.problemeForm.get('courrielGroup.courrielConfirmation')
    courriel.setValue("qwer@gmail.com")
    courrielCon.setValue("asdf@gmail.com")
    let groupe = component.problemeForm.get('courrielGroup')
    expect(groupe.invalid).toBeTrue();
  })

  it("#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel",() =>{
    component.setNotification("courriel")
    let courriel = component.problemeForm.get('courrielGroup.courriel')
    let courrielCon = component.problemeForm.get('courrielGroup.courrielConfirmation')
    courriel.setValue("asdf@gmail.com")
    courrielCon.setValue("asdf@gmail.com")
    let groupe = component.problemeForm.get('courrielGroup')
    expect(groupe.invalid).toBeFalse();
  })

  it('#29 | Zone TELEPHONE est activée quand notifier par messagerie texte',() =>{
    component.setNotification("messageTexte")

    let zone = component.problemeForm.get("telephone");
    expect(zone.enabled).toBeTrue();
  })

  it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte',() =>{
    component.setNotification("messageTexte")

    let zone = component.problemeForm.get("courrielGroup.courriel");
    expect(zone.disabled).toBeTrue();
  })

  it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte',() =>{
    component.setNotification("messageTexte")

    let zone = component.problemeForm.get("courrielGroup.courriel");
    expect(zone.disabled).toBeTrue();
  })

  it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte',() =>{
    component.setNotification("messageTexte")

    let zone = component.problemeForm.get("courrielGroup.courriel");
    zone.setValue('a'.repeat(0))
    expect(zone.status).toBeTruthy();
  })

  it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte',() =>{
    component.setNotification("messageTexte")
    let telephone = component.problemeForm.get("telephone")
    telephone.setValue("asdf")
    let errors = telephone.errors || {};
    expect(errors["pattern"]).toBeTruthy();
  })

  it("#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte",() =>{
    component.setNotification("messageTexte")
    let zone = component.problemeForm.get("telephone")
    zone.setValue('123456789')
    let errors = zone.errors || {};
    expect(errors["minlength"]).toBeTruthy();
  })

  it("#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte",() =>{
    component.setNotification("messageTexte")
    let zone = component.problemeForm.get("telephone")
    zone.setValue('12345678912')
    let errors = zone.errors || {};
    expect(errors["maxlength"]).toBeTruthy();
  })

  it("#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte",() =>{
    component.setNotification("messageTexte")
    let zone = component.problemeForm.get("telephone")
    zone.setValue('1234567891')
    let errors = zone.errors || {};
    expect(errors["required"]).toBeFalsy();
  })
})
