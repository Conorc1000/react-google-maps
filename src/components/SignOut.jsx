import React, {Component} from 'react';
import { auth } from '../firebase';

class SignOutButton extends Component {

  onSubmit = (event) => {
    auth.doSignOut()
  }

  render(){
    return (
      <form onSubmit={this.onSubmit}>
        <button 
          type='submit'
        >
          Sign Out
        </button>
      </form>
    )  
  }

}

export default SignOutButton;