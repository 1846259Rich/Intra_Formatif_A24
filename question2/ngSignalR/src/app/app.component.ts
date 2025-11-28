import { Component } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [MatButtonModule]
})
export class AppComponent {
  title = 'Pizza Hub';

  private hubConnection?: signalR.HubConnection;
  isConnected: boolean = false;

  selectedChoice: number = -1;
  nbUsers: number = 0;

  pizzaPrice: number = 0;
  money: number = 0;
  nbPizzas: number = 0;

  constructor(){
    this.connect();
  }

  connect() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5282/hubs/pizza')
      .build();

    // TODO: Mettre isConnected à true seulement une fois que la connection au Hub est faite
    this.hubConnection!.on('NbUserDataResponse', (data) => {
        this.nbUsers = data;
    });

    this.hubConnection!.on('UpdateMoneyResponse', (data) => {
        this.money = data;
    });

    this.hubConnection!.on('UpdateNbPizzasAndMoney', (data) => {
      console.log(data);
      this.pizzaPrice = data.pizzaPrice;
      this.nbPizzas = data.nbPizzas
    });
    
    this.hubConnection
        .start()
        .then(() => {
            console.log('La connexion au Hub est active!');
            this.isConnected = true;
          })
        .catch(err => console.log('Error while starting connection: ' + err));
  }

  selectChoice(selectedChoice:number) {
    this.selectedChoice = selectedChoice;
    if(this.selectedChoice == -1) return;
    this.hubConnection!.invoke('SelectChoice', this.selectedChoice);
  }

  unselectChoice() {
    if(this.selectedChoice == -1) return;
    this.hubConnection!.invoke('UnselectChoice', this.selectedChoice);
    this.selectedChoice = -1;
  }

  addMoney() {
    if(this.selectedChoice == -1) return;
    this.hubConnection!.invoke('AddMoney', this.selectedChoice);
  }

  buyPizza() {
    if(this.selectedChoice == -1) return;
    this.hubConnection!.invoke('BuyPizza', this.selectedChoice);
  }
}
