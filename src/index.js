import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import  Context  from './Store/FirbaseContext';
import { FirebaseContext } from './Store/FirbaseContext';
import firebase from './firbase/config';

ReactDOM.render(
<FirebaseContext.Provider value={{firebase}}>
    <Context>
        <App />
    </Context>
 </FirebaseContext.Provider>
 , document.getElementById('root'));
