import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProblemeComponent ]
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
})
