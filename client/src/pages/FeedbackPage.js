import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Star, PlusCircle, UserCircle, MessageSquare, ChevronRight, ChevronLeft, Search } from 'lucide-react';
import TestimonialCard from '../components/TestimonialCard';


const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [testimonial, setTestimonial] = useState('');
  const [tripDestination, setTripDestination] = useState('');
  const [tripDate, setTripDate] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Random avatars for new feedback
  const avatars = [
    'https://randomuser.me/api/portraits/women/12.jpg',
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/men/22.jpg',
    'https://randomuser.me/api/portraits/women/33.jpg',
    'https://randomuser.me/api/portraits/men/54.jpg',
    'https://randomuser.me/api/portraits/women/67.jpg',
    'https://randomuser.me/api/portraits/men/76.jpg',
  ];

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/feedbacks");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();

        const feedbacksArray = Array.isArray(data) ? data : (data.data || []);
        setFeedbacks(feedbacksArray);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        setFeedbacks([]); // Set to empty array on error
      }
    };
    fetchFeedbacks();
  }, [isFormVisible]);

  // Load stored feedbacks on component mount
  useEffect(() => {
    const storedFeedbacks = localStorage.getItem('travelFeedbacks');
    if (storedFeedbacks) {
      try {
        const parsedFeedbacks = JSON.parse(storedFeedbacks).map((feedback) => ({
          ...feedback,
          created: new Date(feedback.created)
        }));
        setFeedbacks(parsedFeedbacks);
      } catch (error) {
        console.error('Error parsing stored feedbacks:', error);
        setFeedbacks([]);
      }
    }
  }, []);

  // Save feedbacks to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('travelFeedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  const resetForm = () => {
    setName('');
    setEmail('');
    setLocation('');
    setRating(5);
    setTestimonial('');
    setTripDestination('');
    setTripDate('');
    setEditingFeedback(null);
  };

  const handleOpenForm = () => {
    resetForm();
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    resetForm();
    setIsFormVisible(false);
  };

  const handleEditFeedback = (feedback) => {
    setEditingFeedback(feedback);
    setName(feedback.name);
    setEmail(feedback.email);
    setLocation(feedback.location);
    setRating(feedback.rating);
    setTestimonial(feedback.feedback);
    setTripDestination(feedback.destination);
    setTripDate(feedback.date);
    setIsFormVisible(true);
  };

  const handleDeleteFeedback = async (id) => {
    // setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
    try {
      // First delete from API
      const response = await fetch(`http://localhost:5000/api/feedbacks/${id}`, {
        method: "DELETE"
      });
      
      if (!response.ok) throw new Error("Failed to delete");
      
      // Then update state
      setFeedbacks(feedbacks.filter(feedback => feedback._id !== id));
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  const validateForm = () => {
    if (!name || !email || !testimonial || !rating) {
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    return true;
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    try {
      if (editingFeedback) {
        // Update existing feedback
        const updatedFeedback = {
          ...editingFeedback, // Keep existing properties
          name,
          email,
          location,
          rating: parseInt(rating, 10), // Ensure rating is a number
          feedback: testimonial,
          destination: tripDestination,
          date: tripDate,
        };
  
        const response = await fetch(`http://localhost:5000/api/feedbacks/${editingFeedback._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFeedback),
        });
  
        if (!response.ok) {
          throw new Error("Failed to update feedback");
        }
  
        const savedFeedback = await response.json();
  
        // Update state with the edited feedback
        setFeedbacks(feedbacks.map(fb => (fb._id === editingFeedback._id ? savedFeedback : fb)));
        window.location.reload(); // Reload the page to reflect changes
      } else {
        // Create new feedback
        const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
        const newFeedback = {
          name,
          email,
          location,
          rating: parseInt(rating, 10), // Ensure rating is a number
          feedback: testimonial,
          destination: tripDestination,
          date: tripDate,
          avatar: randomAvatar,
        };
  
        const response = await fetch("http://localhost:5000/api/feedbacks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFeedback),
        });
  
        if (!response.ok) {
          throw new Error("Failed to post feedback");
        }
  
        const savedFeedback = await response.json();
  
        // Add new feedback to the state
        setFeedbacks([savedFeedback, ...feedbacks]);
      }
    } catch (error) {
      console.error("Error handling feedback:", error);
    }
  
    // Close the form after submission
    handleCloseForm();
  };
  

  // Calculate pagination
  const filteredFeedbacks = Array.isArray(feedbacks) 
  ? feedbacks.filter(feedback => {
      if (!feedback) return false;
      return (
        (feedback.name && feedback.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (feedback.destination && feedback.destination.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (feedback.feedback && feedback.feedback.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    })
  : [];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFeedbacks = filteredFeedbacks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {

      year: 'numeric',
      month: 'short',
        
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="travel-container">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 bg-travel-primary">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-travel-dark mb-2">Traveler Feedback</h1>
                <p className="text-travel-neutral">
                  Share your experiences and read what others have to say about their adventures
                </p>
              </div>
              <button
                onClick={handleOpenForm}
                className="btn-accent mt-4 md:mt-0 flex items-center justify-center"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                <span>Add Your Feedback</span>
              </button>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        {isFormVisible && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 animate-fade-in">
            <div className="p-6 bg-travel-secondary text-white">
              <h2 className="text-xl font-semibold">{editingFeedback ? 'Edit Feedback' : 'Share Your Travel Experience'}</h2>
            </div>
            <form onSubmit={handleSubmitFeedback} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <UserCircle className="absolute left-3 top-3 h-5 w-5 text-travel-neutral" />
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="travel-input pl-10"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  {name.trim() === '' && <p className="text-red-500 text-xs mt-1">Full Name is required.</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="travel-input"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                {!/^\S+@\S+\.\S+$/.test(email) && email !== '' && (
            <p className="text-red-500 text-xs mt-1">Enter a valid email address.</p>
          )}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="travel-input"
                    placeholder="City, Country"
                  />
                </div>

                <div>
                  <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                    Trip Destination
                  </label>
                  <input
                    id="destination"
                    type="text"
                    value={tripDestination}
                    onChange={(e) => setTripDestination(e.target.value)}
                    className="travel-input"
                    placeholder="Where did you travel to?"
                  />
                </div>

                <div>
                  <label htmlFor="tripDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Trip Date
                  </label>
                  <input
                    id="tripDate"
                    type="date"
                    value={tripDate}
                    onChange={(e) => setTripDate(e.target.value)}
                    className="travel-input"
                    max={new Date().toISOString().split('T')[0]} // Prevent future dates
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-8 w-8 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                        />
                      </button>
                    ))}
                  </div>
                  {rating === 0 && <p className="text-red-500 text-xs mt-1">Please select a rating.</p>}
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="testimonial" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Feedback <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-travel-neutral" />
                  <textarea
                    id="testimonial"
                    rows={5}
                    value={testimonial}
                    onChange={(e) => setTestimonial(e.target.value)}
                    className="travel-input pl-10"
                    placeholder="Share your travel experience with us and other travelers..."
                    required
                  ></textarea>
                </div>
                {testimonial.trim() === '' && <p className="text-red-500 text-xs mt-1">Feedback is required.</p>}
      
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-6 py-2 border border-gray-300 rounded-md text-travel-dark hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex items-center"
                >
                  <span>{editingFeedback ? 'Update Feedback' : 'Submit Feedback'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search and filter */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-travel-neutral" />
            <input
              type="text"
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
              className="travel-input pl-10"
            />
          </div>
        </div>

        {/* Feedbacks Display */}
        <div className="mb-8">
          {filteredFeedbacks.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-travel-neutral" />
              </div>
              {searchTerm ? (
                <>
                  <h3 className="text-lg font-medium text-travel-dark mb-2">No matching testimonials</h3>
                  <p className="text-travel-neutral mb-6">
                    We couldn't find any testimonials matching your search criteria.
                  </p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="btn-primary"
                  >
                    Clear Search
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-medium text-travel-dark mb-2">No testimonials yet</h3>
                  <p className="text-travel-neutral mb-6">
                    Be the first to share your travel experience with us!
                  </p>
                  <button
                    onClick={handleOpenForm}
                    className="btn-primary inline-flex items-center"
                  >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    <span>Add Your Feedback</span>
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentFeedbacks.map((feedback) => (
                <div key={feedback._id} className="relative group z-20">
                  <TestimonialCard
                    name={feedback.name}
                    location={feedback.location}
                    avatar={feedback.avatar}
                    rating={feedback.rating}
                    testimonial={feedback.feedback}
                    date={feedback.destination + (feedback.date ? ` • ${formatDate(feedback.date)}` : '')}
                  />
                  <div className="absolute top-2 right-2 opacity-1 Z-[999] transition-opacity duration-300 flex space-x-1">
                    <button
                      onClick={() => handleEditFeedback(feedback)}
                      className="p-1 bg-white rounded-full shadow-md text-blue-600  hover:text-blue-800"
                      aria-label="Edit feedback"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteFeedback(feedback._id)}
                      className="p-1 bg-white rounded-full shadow-md text-red-600 hover:text-red-800"
                      aria-label="Delete feedback"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-1">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-md ${currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-travel-dark hover:bg-gray-100'
                  }`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`w-9 h-9 rounded-md ${currentPage === number
                      ? 'bg-travel-secondary text-white'
                      : 'text-travel-dark hover:bg-gray-100'
                    }`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md ${currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-travel-dark hover:bg-gray-100'
                  }`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;