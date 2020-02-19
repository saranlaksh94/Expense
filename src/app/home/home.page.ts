import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public alertController: AlertController) {
    this.expenseList = [];
    this.total = JSON.parse(localStorage.getItem('Total'))
    this.expenseList = JSON.parse(localStorage.getItem('List'))
    console.log("total :", this.total)
    if(this.total < 0 || this.total == null) {
      this.total = 0;
    }
    if(this.expenseList == null){
      this.expenseList = [];
    }
  }
  eventDate: String = new Date().toISOString();
  typeSelected: any;
  items:any;
  expenseList: any;
  desc: any;
  test: any;
  amount: any;
  total: any;
  showCreateExpense: boolean = false;
  showList: boolean = true;

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert Message',
      message: 'Please fill all the field.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async showExpenseDetails(expens) {
    const alert = await this.alertController.create({
      header: expens.type,
      subHeader: expens.desc,
      message: expens.amount,
      buttons: ['OK']
    });

    await alert.present();
  }

addExpense() {
  if(this.desc && this.amount){
    this.showList = true;
    this.showCreateExpense = false;
    let expenseList = {
      date: this.eventDate.split('T')[0],
      type: this.typeSelected,
      desc: this.desc,
      amount: this.amount,
    }
    this.expenseList.push(expenseList);
    this.total += this.amount;
    localStorage.setItem('Total', JSON.stringify(this.total))
    localStorage.setItem('List', JSON.stringify(this.expenseList))
  }
  else{
    this.presentAlert();
  }
  
}

setType() {
  let me=this;
  console.log('languageSelected',me.typeSelected);
}  

removeItem(expens){
  if(this.total < 0) {
    this.total = 0;
  } else {
    this.total -= expens.amount;
  }
  localStorage.setItem('Total', JSON.stringify(this.total))
for(let i = 0; i < this.expenseList.length; i++) {
      if(this.expenseList[i] == expens){       
  this.expenseList.splice(i, 1);
}
}
if(this.expenseList.length == 0) {
  localStorage.clear();
}
}

onChange(value) {
  console.log("trigger", value)
}

createExpense() {
  this.showCreateExpense = true;
  this.showList = false;
}

}
