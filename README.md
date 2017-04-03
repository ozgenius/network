# network
$ ionic plugin add cordova-plugin-network-information
$ npm install --save @ionic-native/network
komutlarıyla cordova plugin ve node network modulu kurulumu

app.module.ts dosyasında  
import { Network } from '@ionic-native/network';
işleminden sonra provider alanına 
 providers: [
     .....
     Network,
     ....
     ]
 tanımla
 home.ts de kullanım örneği
