import React, {Component} from 'react';
import { auth } from '../firebase';
import {
  Button
} from 'reactstrap';
class SignOutButton extends Component {

  onSubmit = (event) => {
    auth.doSignOut()
  }

  render(){
    return (
      <form onSubmit={this.onSubmit}>
        <Button 
          type='submit'
        >
          Sign Out
        </Button>
      </form>
    )  
  }

}

export default SignOutButton;