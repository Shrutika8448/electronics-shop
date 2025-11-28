import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Summer Sale',
    subtitle: 'Up to 50% OFF',
    description: 'On all smartphones and tablets',
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200',
    bgColor: 'from-primary-600 to-primary-800',
  },
  {
    id: 2,
    title: 'New Arrivals',
    subtitle: 'Latest Tech',
    description: 'Discover the newest electronics in stock',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200',
    bgColor: 'from-warm-600 to-warm-800',
  },
  {
    id: 3,
    title: 'Free Shipping',
    subtitle: 'On All Orders',
    description: 'No minimum purchase required',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200',
    bgColor: 'from-cream-600 to-cream-800',
  },
];

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden mb-12 shadow-2xl">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-90`}></div>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-6 max-w-3xl">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 drop-shadow-md">
                  {slide.subtitle}
                </p>
                <p className="text-lg md:text-xl text-white/90 drop-shadow">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;

