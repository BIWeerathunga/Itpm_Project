// components/ReportGenerator.js
import React, { useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { FaFileExcel, FaFilePdf, FaDownload } from 'react-icons/fa';
import reportService from '../services/reportService';

const ReportGenerator = ({ type }) => {
  const [show, setShow] = useState(false);
  const [format, setFormat] = useState('excel');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      let response;
      if (type === 'feedback') {
        response = await reportService.generateFeedbackReport(format, startDate, endDate);
      } else {
        response = await reportService.generateInquiryReport(format, startDate, endDate);
      }
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${type}_report.${format === 'pdf' ? 'pdf' : 'xlsx'}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      setShow(false);
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Button 
        variant="outline-primary" 
        onClick={() => setShow(true)}
        className="me-2"
      >
        <FaDownload className="me-2" />
        Generate {type === 'feedback' ? 'Feedback' : 'Inquiry'} Report
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Generate {type === 'feedback' ? 'Feedback' : 'Inquiry'} Report
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>
                Report Format
              </Form.Label>
              <Col sm={8}>
                <div className="d-flex gap-3">
                  <Button
                    variant={format === 'excel' ? 'primary' : 'outline-primary'}
                    onClick={() => setFormat('excel')}
                  >
                    <FaFileExcel className="me-2" />
                    Excel
                  </Button>
                  <Button
                    variant={format === 'pdf' ? 'primary' : 'outline-primary'}
                    onClick={() => setFormat('pdf')}
                  >
                    <FaFilePdf className="me-2" />
                    PDF
                  </Button>
                </div>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>
                Date Range
              </Form.Label>
              <Col sm={8}>
                <Row>
                  <Col>
                    <Form.Control
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      placeholder="Start Date"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      placeholder="End Date"
                    />
                  </Col>
                </Row>
                <Form.Text className="text-muted">
                  Leave empty for all records
                </Form.Text>
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Report'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReportGenerator;