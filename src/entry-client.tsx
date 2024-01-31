import { hydrateRoot } from 'react-dom/client';
 
import App from './app';
let root = document.getElementById('app')

let data;
 
if (typeof window !== 'undefined') {
  data = (window as any).__data__;
}

if(root){
    hydrateRoot(root, <App data={data}/>);
}