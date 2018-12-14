import React, { Component } from "react";
import fetchImgsService from "../services/fetchImgsService";
import {
  Button,
  Card,
  CardTitle,
  CardBody,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";

const INITIAL_STATE = {
  slipwayDetail: {},
  latLngArray: ["", ""],
  activeIndex: 0,
  imgs: []
};

class NewSlipwayForm extends Component {
  constructor(props) {
    super(props);
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

  render() {
    const slides = this.state.imgs.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img
            src={item.src}
            alt={item.altText}
            className="slipway-img-max-width-height"
          />
          <CarouselCaption />
        </CarouselItem>
      );
    });
    return (
      <Card>
        <CardBody>
          <CardTitle>Slipway Name: {this.state.slipwayDetail.Name}</CardTitle>

          <a href={this.state.editUrl}>
            <Button color="warning" className="form-bottom-margin">
              Edit Slipway Information
            </Button>
          </a>
          <p>
            <b>Latitude:</b> {this.state.latLngArray[0]}
          </p>
          <p>
            <b>Longitude:</b> {this.state.latLngArray[1]}
          </p>
          <div className="form-bottom-margin slipway-img-max-width-height">
            <Carousel
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
              <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={this.previous}
              />
              <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={this.next}
              />
            </Carousel>
          </div>
          <p>
            <b>Description:</b>
            {this.state.slipwayDetail.Description}
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
            <b>Phone Number:</b> {this.state.slipwayDetail.PhoneNumber}
          </p>
          <p>
            <b>Email:</b> {this.state.slipwayDetail.Email}
          </p>
        </CardBody>
      </Card>
    );
  }
}

export default NewSlipwayForm;
