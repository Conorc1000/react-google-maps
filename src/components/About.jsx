import React from 'react';
import {
  Card, CardBody, CardTitle, CardText
} from 'reactstrap';
import {
  Link,
} from 'react-router-dom';
import * as routes from '../constants/routes';

const AccountPage = () =>
<Card>
  <CardBody>
    <CardTitle><b>About Us</b></CardTitle>
    <CardText>
      www.boatlaunch.co.uk is the only UK on-line boating directory with up-to-date and comprehensive information on slipways. It is designed to deliver information for all boating activities with easy-to-use interactive maps. The slipway data is contributed
      by sailors, divers, fishermen, water skiers, harbourmasters and marina operators alike.</CardText>
    <CardText>
      All our information is available free of charge for use on web sites or electronic navigation devices and we are the leading supplier of electronic data to the marine leisure industry. Our partnerships with the top names in the boating world including
      Garmin, Memory Map and SeaPro. We have extensive knowledge of geo-coded database development, usability and quality of data and we develop sophisticated internet mapping interfaces.
    </CardText>
    <CardText>
      We want the new boatlaunch to be the best online boating directory available to you. We want to make it better so please <Link to={routes.CONTACT}>Contact Us</Link> with and feedback you have about our new web site.
    </CardText>
  </CardBody>
</Card>

export default AccountPage
