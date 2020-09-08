import React from 'react';

export default class BannerResponsiveAd extends React.Component {
  // componentDidMount() {
  //   window.adsbygoogle = window.adsbygoogle || []
  //   window.adsbygoogle.push({})
  // }
  shouldComponentUpdate(nextProps) {
    console.log("BANNER AD CURRENT PATH should UPDATE",  this.props.currentPath !== nextProps.currentPath )
    return this.props.currentPath !== nextProps.currentPath
  }

  componentDidUpdate () {
    window.adsbygoogle = window.adsbygoogle || []
    window.adsbygoogle.push({})
  }

  render () {
    const { path } = this.props;

    return (
      <div key={path} className='ad' style={{'display':'block', 'text-align':'center' }} >
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
