import React, { Component } from "react";
import fetchImgsService from "../services/fetch-imgs-service";
import imgUploadService from "../services/img-upload-service";
import { updateSlipwayDetails } from "../firebase/database";

import {
  Button,
  Card,
  CardTitle,
  CardBody,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from "reactstrap";
import classnames from "classnames";

const INITIAL_STATE = {
  slipwayDetail: {},
  latLngArray: ["", ""],
  activeIndex: 0,
  activeTab: "1",
  imgs: []
};

class ViewSlipwayForm extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.state = { ...INITIAL_STATE };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state.slipwayDetails !== this.state.slipwayDetails) {
      this.setState({
        slipwayDetail: nextProps.state.slipwayDetails[this.props.state.id],
        imgs: fetchImgsService(
          nextProps.state.slipwayDetails[this.props.state.id].imgs
        ),
        latLngArray: nextProps.state.latLngArray,
        editUrl: "/edit-slipway/" + nextProps.state.latLngArray[2]
      });
    }
  }

  imgUpload = (event) => {

    var uploadMsgDiv = document.getElementById('upload-msg-div');

    var fileChooser = document.getElementById('file-chooser');

    var file = fileChooser.files[0];

    var slipway = this.state.slipwayDetail

    if (!slipway.imgs) {
      slipway.imgs = [];
    }


    if(!file)
    {
      alert('No image selected to upload. Please choose file first.')
      return;
    } else {

      if(file.size > 20971520) {
        alert('File too large. Please upload an image of less than 20Mb');
        return;
      }

      var newImgId = "New" + Date.now();

      uploadMsgDiv.innerHTML = 'uploading image...';

      imgUploadService(file, uploadMsgDiv, newImgId, (err) => {

        slipway.imgs.push(newImgId);

        updateSlipwayDetails(slipway, (err) => {
          uploadMsgDiv.innerHTML = '';
        });

      });

    }

  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === this.state.imgs.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? this.state.imgs.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {


    let carouselPrevControl = <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={this.previous}
        />

    let carouselNextControl = (<CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={this.next}
        />)


    let carousel;
    let images;
    if (this.state.imgs) {
      let slides = this.state.imgs.map(item => {
        return (
          <CarouselItem
            onExiting={this.onExiting}
            onExited={this.onExited}
            key={item.src}
            className="carousel-item"
          >
            <img
              src={item.src}
              alt={item.altText}
              className="slipway-img"
            />
          </CarouselItem>
        );
      });

      carousel = (
        <div className="form-bottom-margin slipway-img-max-width-height">
          <Carousel
            interval="10000000"
            activeIndex={this.state.activeIndex}
            next={this.next}
            previous={this.previous}
          >
            <CarouselIndicators
              items={this.state.imgs}
              activeIndex={this.state.activeIndex}
              onClickHandler={this.goToIndex}
            />
            {slides}
            {carouselPrevControl}
            {carouselNextControl}
          </Carousel>
        </div>
      );

      images = this.state.imgs.map(item => {
        return (<img
          src={item.src}
          alt={item.altText}
          className="slipway-img"
        />)
      })
    } else {
      carousel = (<p><b>Images:</b> No images uploaded yet, you can upload photos via the "Manage images" tab above</p>)
    }

    return (
      <Card>
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "1" })}
                onClick={() => {
                  this.toggle("1");
                }}
              >
                Slipway info
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "2" })}
                onClick={() => {
                  this.toggle("2");
                }}
              >
                Manage images
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <CardBody>
                    <a href={this.state.editUrl}>
                      <Button color="info" className="form-bottom-margin">
                        Edit slipway info
                      </Button>
                    </a>
                    <p>
                      <b>Slipway Name:</b> {this.state.slipwayDetail.Name}
                    </p>
                    <br/>
                    {carousel}
                    <br/>
                    <p>
                      <b>Latitude:</b> {this.state.latLngArray[0]}
                    </p>
                    <p>
                      <b>Longitude:</b> {this.state.latLngArray[1]}
                    </p>
                    <p>
                      <b>Description:</b> {this.state.slipwayDetail.RampDescription}
                    </p>
                    <p>
                      <b>Directions:</b> {this.state.slipwayDetail.Directions}
                    </p>
                    <p>
                      <b>Facilities:</b> {this.state.slipwayDetail.Facilities}
                    </p>
                    <p>
                      <b>Navigational Hazards:</b>
                      {this.state.slipwayDetail.NavigationalHazards}
                    </p>
                    <p>
                      <b>Charges:</b> {this.state.slipwayDetail.Charges}
                    </p>
                    <p>
                      <b>Ramp Type:</b> {this.state.slipwayDetail.RampType}
                    </p>
                    <p>
                      <b>Suitability:</b> {this.state.slipwayDetail.Suitability}
                    </p>
                    <p>
                      <b>Ramp Length:</b> {this.state.slipwayDetail.RampLength}
                    </p>
                    <p>
                      <b>Upper Area:</b> {this.state.slipwayDetail.UpperArea}
                    </p>
                    <p>
                      <b>Lower Area:</b> {this.state.slipwayDetail.LowerArea}
                    </p>
                    <p>
                      <b>Phone Number:</b>{" "}
                      {this.state.slipwayDetail.PhoneNumber}
                    </p>
                    <p>
                      <b>Email:</b> {this.state.slipwayDetail.Email}
                    </p>

                  </CardBody>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <CardBody>
                    <CardTitle>Choose an image to upload</CardTitle>
                    <input type="file" id="file-chooser"/>
                    <Button onClick={this.imgUpload} color="info" className="form-bottom-margin">
                      Upload chosen image
                    </Button>
                    <div id="upload-msg-div"> </div>
                    <br/>
                    <br/>
                    <CardTitle>Current images</CardTitle>
                    {images}
                  </CardBody>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </Card>
    );
  }
}

export default ViewSlipwayForm;
