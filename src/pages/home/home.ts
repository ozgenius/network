import { Component } from '@angular/core';

import { NavController, ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  connected: Subscription;
  disconnected: Subscription;
  constructor(private toast:ToastController, private geolocation: Geolocation, public navCtrl: NavController, private network: Network) {
    
  }
  location(){
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp);
 // resp.coords.latitude
 // resp.coords.longitude
}).catch((error) => {
  console.log('Error getting location', error);
});
  }
  displayNetworkUpdate(connectionState: string){
  let networkType = this.network.type
  this.toast.create({
    message: `You are now ${connectionState} via ${networkType}`,
    duration: 3000
  }).present();
}
 ionViewDidEnter() {
  this.connected = this.network.onConnect().subscribe(data => {
    console.log(data)
    this.displayNetworkUpdate(data.type);
  }, error => console.error(error));
 
  this.disconnected = this.network.onDisconnect().subscribe(data => {
    console.log(data)
    this.displayNetworkUpdate(data.type);
  }, error => console.error(error));
}
ionViewWillLeave(){
  this.connected.unsubscribe();
  this.disconnected.unsubscribe();
}

}
