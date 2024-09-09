// TestimonialSlider.tsx
import React from "react";
import Slider from "react-slick";
import { testimonials } from "@/lib/testimonialsData";

const Testimonials = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		pauseOnHover: true,
		arrows: true,
	};

	return (
		<div className="testimonial-slider w-full flex flex-col justify-center items-center mt-8">
			<p className="text-2xl w-fit">Testimonials</p>
			<Slider {...settings} className="w-1/2 mx-auto">
				{testimonials.map((testimonial) => (
					<div key={testimonial.id} className="flex items-center p-4">
						<div className="shadow-lg rounded-lg p-6 bg-blue-300">
							<div className="flex items-center gap-x-4 mb-4 w-fit">
								<img
									src={testimonial.image}
									alt={testimonial.name}
									className="w-16 h-16 rounded-full"
								/>
								<div>
									<h4 className="text-lg font-semibold">{testimonial.name}</h4>
									<p className="text-sm text-gray-500">{testimonial.title}</p>
								</div>
							</div>
							<p className="text-gray-600 italic">"{testimonial.quote}"</p>
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default Testimonials;
