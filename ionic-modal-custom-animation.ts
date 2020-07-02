import { Injectable } from '@angular/core';
import { ModalController, AnimationController } from '@ionic/angular';
import { EasterEggComponent } from './easter-egg.component';

@Injectable({
  providedIn: 'root'
})
export class EasterEggService {
  private modalTimer: any;
  private _easterEggTriggerText = 'cam@antbrains';
  private modalTimeout = 10000;

  constructor(
    private modalController: ModalController,
    private animationCtrl: AnimationController,
  ) { }

  get easterEggTriggerText() {
    return this._easterEggTriggerText;
  }

  modalEnterAnimation(baseEl: any) {
    const backdropAnimation = this.animationCtrl.create()
    .addElement(baseEl.querySelector('ion-backdrop')!)
    .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');
    
    const wrapper = baseEl.querySelector('.modal-wrapper');
    wrapper.style.background = 'transparent';
    wrapper.style.boxShadow = 'none';
    wrapper.style.width = '75%';
    wrapper.style.maxWidth = '1280px';
    wrapper.style.marginTop = '100px';
    const wrapperAnimation = this.animationCtrl.create()
      .addElement(wrapper!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' }
      ]);

    return this.animationCtrl.create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(1500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  }

  modalLeaveAnimation(baseEl: any) {
    return this.modalEnterAnimation(baseEl).direction('reverse');
  }

  openModal() {
    this.modalController.create({
      component: EasterEggComponent,
      enterAnimation: this.modalEnterAnimation.bind(this),
      leaveAnimation: this.modalLeaveAnimation.bind(this),
    }).then(modalEl => {
      modalEl.present();
      this.modalTimer = setTimeout(() => {
        modalEl.dismiss();
      }, this.modalTimeout);
      return modalEl.onDidDismiss();
    }).then(() => {
      clearTimeout(this.modalTimer);
    });
  }
}
