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
      any thoughts you have about the site, how easy it is to use or any suggestions about how to make it better. Or if you have any feedback
      on things you have found wrong with the site or things that have not worked. In your email, please include information about.
    </CardText>
    <CardText>
      1) What type of device you are using, e.g. Iphone 6 or desktop.
    </CardText>
    <CardText>
      2) What browser you are using e.g.Chrome.
    </CardText>
    <CardText>
      3) What Operating System e.g. Andriod or Windows.
    </CardText>
    <CardText>
      4) What page you were on when you experienced the problem.
    </CardText>

    <CardText>
      I am a freelance web developer. If you would like me to build you a website please get in touch.
    </CardText>

  </CardBody>
</Card>

export default AccountPage
