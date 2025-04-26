import React, { useEffect, useState } from 'react';
import { Table, Button, Badge, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { FaTrash, FaCheck, FaTimes, FaReply } from 'react-icons/fa';
import feedbackService from '../../../services/feedbackService';
import ReportGenerator from '../../../components/ReportGenerator';
import { Edit, Trash2 } from 'lucide-react';
import TestimonialCard from '../../../components/TestimonialCard';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const FeedbackIndex = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [showModal, setShowModal] = useState(false);
  // const [currentFeedback, setCurrentFeedback] = useState(null);
  // const [responseText, setResponseText] = useState('');

  // useEffect(() => {
  //   fetchFeedbacks();
  // }, []);

  // const fetchFeedbacks = async () => {
  //   try {
  //     const { data } = await feedbackService.getAllFeedback();
  //     setFeedbacks(data);
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleStatusChange = async (id, status) => {
  //   try {
  //     await feedbackService.updateFeedback(id, { status });
  //     fetchFeedbacks();
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  // const handleDelete = async (id) => {
  //   try {
  //     await feedbackService.deleteFeedback(id);
  //     fetchFeedbacks();
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  // const handleResponseSubmit = async () => {
  //   try {
  //     await feedbackService.updateFeedback(currentFeedback._id, {
  //       response: responseText,
  //       status: 'published'
  //     });
  //     setShowModal(false);
  //     fetchFeedbacks();
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  // if (loading) return <Spinner animation="border" variant="primary" className="m-4" />;
  // if (error) return <Alert variant="danger" className="m-4">{error}</Alert>;

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
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
       
    }).format(date);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const imgLogo = new Image();
    imgLogo.src = require("../../../assets/navlogo.png");
  
    imgLogo.onload = () => {
      // Header
      doc.addImage(imgLogo, "PNG", 14, 5, 25, 15);
  
      doc.setFont("helvetica", "bold");
      doc.setTextColor("48752c");
      doc.setFontSize(16);
      doc.text("Travelly Trip Management System", 95, 15);
  
      // Add title
      doc.setFontSize(20);
      doc.text("Filtered Feedbacks Report", 14, 28);
  
      // Add current date
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Generated Date: ${new Date().toLocaleString()}`, 14, 35);
  
      // Summary Table by Status and State
      autoTable(doc, {
        startY: 42, // Explicitly set the starting Y position for the first table
        head: [["Summary", "Count"]],
        body: [["Total Feedbacks", feedbacks.length]],
        theme: "grid",
      });
  
      // Get the final Y position of the first table
      const finalY = doc.lastAutoTable.finalY || 42; // Fallback to 42 if no previous table
  
      // Add Inquiry Data Table
      autoTable(doc, {
        startY: finalY + 10, // Use the final Y position of the previous table + offset
        head: [["Name", "Email", "Feedback", "Rating", "Destination"]],
        body: feedbacks.map((feedback) => [
          feedback.name,
          feedback.email,
          feedback.feedback,
          feedback.rating,
          feedback.destination,
        ]),
        theme: "grid",
      });
  
      // Save the PDF
      const generatedDate = new Date().toLocaleDateString().replace(/\//g, "-");
      doc.save(`Feedbacks_Report_${generatedDate}.pdf`);
    };
  
    // Handle case where image fails to load
    imgLogo.onerror = () => {
      console.error("Failed to load logo image");
      // Optionally proceed without the image or show an alert
      doc.setFont("helvetica", "bold");
      doc.setTextColor("48752c");
      doc.setFontSize(16);
      doc.text("Travelly Trip Management System", 95, 15);
  
      doc.setFontSize(20);
      doc.text("Filtered Feedbacks Report", 14, 28);
  
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Generated Date: ${new Date().toLocaleString()}`, 14, 35);
  
      autoTable(doc, {
        startY: 42,
        head: [["Summary", "Count"]],
        body: [["Total Feedbacks", feedbacks.length]],
        theme: "grid",
      });
  
      const finalY = doc.lastAutoTable.finalY || 42;
  
      autoTable(doc, {
        startY: finalY + 10,
        head: [["Name", "Email", "Feedback", "Rating", "Destination"]],
        body: feedbacks.map((feedback) => [
          feedback.name,
          feedback.email,
          feedback.feedback,
          feedback.rating,
          feedback.destination,
        ]),
        theme: "grid",
      });
  
      const generatedDate = new Date().toLocaleDateString().replace(/\//g, "-");
      doc.save(`Feedbacks_Report_${generatedDate}.pdf`);
    };
  };

  return (
    // <div className="container-fluid px-4">
    //   <h1 className="mt-4">Feedback Management</h1>



    //   <div className="card mb-4">
    //     <div className="card-header d-flex justify-content-between align-items-center">
    //       <h3 className="mb-0">Customer Feedback</h3>
    //       <div className="d-flex">
    //       <ReportGenerator type="feedback" />
    //         <Form.Control
    //           type="text"
    //           placeholder="Search feedback..."
    //           className="me-2"
    //           style={{ width: '250px' }}
    //         />
    //         <Button variant="primary" onClick={fetchFeedbacks}>
    //           Refresh
    //         </Button>
    //       </div>
    //     </div>

    //     <div className="card-body">
    //       <Table striped bordered hover responsive>
    //         <thead>
    //           <tr>
    //             <th>#</th>
    //             <th>Name</th>
    //             <th>Rating</th>
    //             <th>Message</th>
    //             <th>Status</th>
    //             <th>Date</th>
    //             <th>Actions</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {feedbacks.map((feedback, index) => (
    //             <tr key={feedback._id}>
    //               <td>{index + 1}</td>
    //               <td>{feedback.name}</td>
    //               <td>
    //                 {[...Array(5)].map((_, i) => (
    //                   <span 
    //                     key={i} 
    //                     style={{ 
    //                       color: i < feedback.rating ? '#ffc107' : '#e4e5e9',
    //                       fontSize: '1.2rem'
    //                     }}
    //                   >
    //                     ★
    //                   </span>
    //                 ))}
    //               </td>
    //               <td>{feedback.message.substring(0, 50)}{feedback.message.length > 50 ? '...' : ''}</td>
    //               <td>
    //                 <Badge 
    //                   bg={
    //                     feedback.status === 'pending' ? 'warning' :
    //                     feedback.status === 'published' ? 'success' : 'danger'
    //                   }
    //                 >
    //                   {feedback.status}
    //                 </Badge>
    //               </td>
    //               <td>
    //                 {new Date(feedback.createdAt).toLocaleDateString()}
    //               </td>
    //               <td>
    //                 <div className="d-flex gap-2">
    //                   <Button
    //                     variant="success"
    //                     size="sm"
    //                     onClick={() => handleStatusChange(feedback._id, 'published')}
    //                     disabled={feedback.status === 'published'}
    //                     title="Publish"
    //                   >
    //                     <FaCheck />
    //                   </Button>
    //                   <Button
    //                     variant="danger"
    //                     size="sm"
    //                     onClick={() => handleStatusChange(feedback._id, 'rejected')}
    //                     disabled={feedback.status === 'rejected'}
    //                     title="Reject"
    //                   >
    //                     <FaTimes />
    //                   </Button>
    //                   <Button
    //                     variant="info"
    //                     size="sm"
    //                     onClick={() => {
    //                       setCurrentFeedback(feedback);
    //                       setResponseText(feedback.response || '');
    //                       setShowModal(true);
    //                     }}
    //                     title="Respond"
    //                   >
    //                     <FaReply />
    //                   </Button>
    //                   <Button
    //                     variant="outline-danger"
    //                     size="sm"
    //                     onClick={() => handleDelete(feedback._id)}
    //                     title="Delete"
    //                   >
    //                     <FaTrash />
    //                   </Button>
    //                 </div>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </Table>
    //     </div>
    //   </div>

    //   {/* Response Modal */}
    //   <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
    //     <Modal.Header closeButton>
    //       <Modal.Title>Respond to Feedback</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>
    //       <Form.Group className="mb-3">
    //         <Form.Label>Original Feedback</Form.Label>
    //         <Form.Control
    //           as="textarea"
    //           rows={3}
    //           value={currentFeedback?.message || ''}
    //           readOnly
    //           className="mb-3"
    //         />
    //         <Form.Label>Rating</Form.Label>
    //         <div>
    //           {[...Array(5)].map((_, i) => (
    //             <span 
    //               key={i} 
    //               style={{ 
    //                 color: i < (currentFeedback?.rating || 0) ? '#ffc107' : '#e4e5e9',
    //                 fontSize: '1.5rem'
    //               }}
    //             >
    //               ★
    //             </span>
    //           ))}
    //         </div>
    //       </Form.Group>
    //       <Form.Group>
    //         <Form.Label>Your Response</Form.Label>
    //         <Form.Control
    //           as="textarea"
    //           rows={5}
    //           value={responseText}
    //           onChange={(e) => setResponseText(e.target.value)}
    //           placeholder="Type your response here..."
    //         />
    //       </Form.Group>
    //     </Modal.Body>
    //     <Modal.Footer>
    //       <Button variant="secondary" onClick={() => setShowModal(false)}>
    //         Cancel
    //       </Button>
    //       <Button variant="primary" onClick={handleResponseSubmit}>
    //         Submit Response
    //       </Button>
    //     </Modal.Footer>
    //   </Modal>
    // </div>
    <>
    <div className=' py-3 flex justify-end items-center px-9'>
      <button className=" bg-blue-500 rounded-lg px-5 py-2 text-sm font-semibold text-white" onClick={downloadPDF}>
      Generate Report
        </button>
    </div>
      <div className="grid px-9 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((feedback) => (
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
              {/* <button
                      onClick={() => handleEditFeedback(feedback)}
                      className="p-1 bg-white rounded-full shadow-md text-blue-600  hover:text-blue-800"
                      aria-label="Edit feedback"
                    >
                      <Edit className="h-4 w-4" />
                    </button> */}
              {/* <button
                      onClick={() => handleDeleteFeedback(feedback._id)}
                      className="p-1 bg-white rounded-full shadow-md text-red-600 hover:text-red-800"
                      aria-label="Delete feedback"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button> */}
            </div>


          </div>
        ))}
      </div>
    </>
  );
};

export default FeedbackIndex;