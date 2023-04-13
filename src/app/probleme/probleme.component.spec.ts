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
    expect(zone.disabled).toBeTrue();
  });

  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier',() =>{
    component.setNotification("courrielConfirmation")

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation')
    expect(zone.disabled).toBeTrue();
  });
})
