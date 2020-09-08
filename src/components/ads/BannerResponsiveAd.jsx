import React from 'react';

export default class BannerResponsiveAd extends React.Component {
  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

render () {
    return (
      <div className='ad' style={{'display':'block' }} >
        <ins className='adsbygoogle'
          style={{ display: 'inline-block' 
          , 'width': '728px'
          , 'height':'90px' }}
          data-ad-client='ca-pub-7949613215795919'
          data-ad-slot='9754177784'
          data-full-width-responsive='true' />
      </div>
    );
  }
}
