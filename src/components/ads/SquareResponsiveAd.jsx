import React from 'react';

export default class SquareResponsiveAd extends React.Component {

  shouldComponentUpdate(nextProps) {
    console.log("this.props.currentPath",  this.props.currentPath )
    console.log("nextProps.currentPath",  nextProps.currentPath )

    console.log("SQUARE AD CURRENT PATH should UPDATE",  this.props.currentPath !== nextProps.currentPath )
    return this.props.currentPath !== nextProps.currentPath
  }

  componentDidUpdate () {
    window.adsbygoogle = window.adsbygoogle || []
    window.adsbygoogle.push({})
  }

render () {
    return (
      <div className='ad' style={{ 'margin-top': '1rem' }} >
        <ins className='adsbygoogle'
          style={{ display: 'block' }}
          data-ad-client='ca-pub-7949613215795919'
          data-ad-slot='2358535105'
          data-ad-format='auto'
          data-full-width-responsive='true' />
      </div>
    );
  }
}
