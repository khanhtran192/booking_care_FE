import React from "react";
import { Carousel, CarouselProps } from "react-responsive-carousel";

interface AppCarouselProps extends CarouselProps {}

function AppCarousel(props: AppCarouselProps) {
	return <Carousel {...props} />;
}

AppCarousel.defaultProps = {
	showArrows: true,
	centerMode: true,
	centerSlidePercentage: 30,
	showThumbs: false,
	autoPlay: true,
	stopOnHover: true,
	infiniteLoop: true,
	transitionTime: 500,
	showIndicators: false,
} as CarouselProps;

export default React.memo(AppCarousel);
