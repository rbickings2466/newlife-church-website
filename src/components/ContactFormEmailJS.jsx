// Alternative contact form implementation using EmailJS
// Install: npm install @emailjs/browser

import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Send } from "lucide-react";
import Button from "./Button";

const ContactFormEmailJS = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your EmailJS credentials
      await emailjs.sendForm(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        form.current,
        "YOUR_PUBLIC_KEY" // Replace with your EmailJS public key
      );

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("EmailJS error:", error);
      alert(
        "Sorry, there was an error sending your message. Please try again."
      );
    }

    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className='bg-green-600 text-white p-6 rounded-xl text-center'>
        <div className='w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4'>
          <Send className='w-8 h-8' />
        </div>
        <h4 className='text-xl font-semibold mb-2'>Message Sent!</h4>
        <p>Thank you for reaching out. We'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form ref={form} onSubmit={handleSubmit} className='space-y-6'>
      <div className='grid md:grid-cols-2 gap-6'>
        <div>
          <label className='block text-sm font-medium text-gray-300 mb-2'>
            Your Name *
          </label>
          <input
            type='text'
            name='name'
            required
            value={formData.name}
            onChange={handleInputChange}
            placeholder='Enter your full name'
            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600 transition-all duration-200'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-300 mb-2'>
            Your Email *
          </label>
          <input
            type='email'
            name='email'
            required
            value={formData.email}
            onChange={handleInputChange}
            placeholder='Enter your email address'
            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600 transition-all duration-200'
          />
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-300 mb-2'>
          Subject
        </label>
        <input
          type='text'
          name='subject'
          value={formData.subject}
          onChange={handleInputChange}
          placeholder='What is this about?'
          className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600 transition-all duration-200'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-300 mb-2'>
          Your Message *
        </label>
        <textarea
          name='message'
          required
          value={formData.message}
          onChange={handleInputChange}
          rows={5}
          placeholder='Share your thoughts, questions, or prayer requests...'
          className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600 resize-none transition-all duration-200'
        ></textarea>
      </div>

      <Button
        type='submit'
        className='w-full'
        size='lg'
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2'></div>
            Sending...
          </>
        ) : (
          <>
            <Send className='w-5 h-5 mr-2' />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactFormEmailJS;
