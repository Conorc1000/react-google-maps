import React from 'react';
import {
  Card, CardBody, CardTitle, CardText
} from 'reactstrap';

const AccountPage = () =>
<Card>
  <CardBody>
    <CardTitle><b>Contact Developer</b></CardTitle>
    <CardText>
      Please email me at <a target ="_blank" href="mailto:conorc1000@gmail.com">conorc1000@gmail.com</a> with
      any thoughts you have about the site, how easy it is to use or any suggestions about how to make it better.
    </CardText>
    <CardText>
      Please get in touch if you would like a downloadable version of the infomation on this website. 
    </CardText>
    <CardText>
      I am a freelance web developer. If you would like me to build you a website please get in touch. See my <a href="https://www.linkedin.com/in/conor-campbell-357ab061">Linkedin Profile</a>
    </CardText>

  </CardBody>
</Card>

export default AccountPage
