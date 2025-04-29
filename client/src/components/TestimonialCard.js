import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({
  name,
  location,
  avatar,
  rating,
  testimonial,
  date
}) => {
  // Create stars array based on rating
  const stars = Array.from({ length: 5 }, (_, index) => index < rating);
  
  return (
    <div className="travel-card p-6 h-full flex flex-col bg-transparent">
      <div className="flex items-center mb-4">
        <img 
          src={avatar} 
          alt={name} 
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-travel-dark">{name}</h4>
          <p className="text-sm text-travel-neutral">{location}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {stars.map((filled, index) => (
          <Star 
            key={index}
            size={16} 
            className={filled ? "text-yellow-400 fill-current" : "text-gray-300"}
          />
        ))}
      </div>
      
      <p className="text-gray-700 italic flex-grow">{testimonial}</p>
      
      <p className="text-xs text-travel-neutral mt-4">{date}</p>
    </div>
  );
};

export default TestimonialCard;