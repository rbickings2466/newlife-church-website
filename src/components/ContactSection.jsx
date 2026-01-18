import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Youtube,
  Facebook,
  Instagram,
  Send,
} from "lucide-react";
import Button from "./Button";
import { churchInfo, socialMedia, serviceTimes, getGoogleMapsUrl } from "../config/siteConfig";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
      // EmailJS configuration - Replace these with your actual values
      const serviceID =
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "your_service_id";
      const templateID =
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "your_template_id";
      const publicKey =
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "your_public_key";

      // Create template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || "New Contact Form Message",
        message: formData.message,
        to_email: churchInfo.email,
        reply_to: formData.email,
      };

      // Send email via EmailJS
      const result = await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        publicKey
      );

      console.log("EmailJS Success:", result.text);

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert(
        `Sorry, there was an error sending your message. Please try again or contact us directly at ${churchInfo.email}`
      );
    }

    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      content: `${churchInfo.address.street}\n${churchInfo.address.city}, ${churchInfo.address.state} ${churchInfo.address.zip}`,
      link: getGoogleMapsUrl(),
    },
    {
      icon: Clock,
      title: "Service Times",
      content: `Sunday Worship: ${serviceTimes.worship.time}\nSunday School: ${serviceTimes.sundaySchool.time}`,
    },
    {
      icon: Phone,
      title: "Phone",
      content: churchInfo.phone,
      link: churchInfo.phoneLink,
    },
    {
      icon: Mail,
      title: "Email",
      content: churchInfo.email,
      link: `mailto:${churchInfo.email}`,
    },
  ];

  // Build social links dynamically based on config
  const socialLinks = [
    socialMedia.youtube.enabled && {
      icon: Youtube,
      name: "YouTube",
      url: socialMedia.youtube.url,
      color: "bg-red-600 hover:bg-red-700",
    },
    socialMedia.facebook.enabled && {
      icon: Facebook,
      name: "Facebook",
      url: socialMedia.facebook.url,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    socialMedia.instagram.enabled && {
      icon: Instagram,
      name: "Instagram",
      url: socialMedia.instagram.url,
      color: "bg-pink-600 hover:bg-pink-700",
    },
  ].filter(Boolean);

  return (
    <section className='py-16 lg:py-24 bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-16'>
          {/* Contact Information */}
          <div className='animate-fade-in'>
            <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-8'>
              Visit Us
            </h2>

            <div className='space-y-8 mb-12'>
              {contactInfo.map((item, index) => (
                <div key={index} className='flex items-start space-x-4'>
                  <div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0'>
                    <item.icon className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <p className='font-semibold text-lg text-white mb-1'>
                      {item.title}
                    </p>
                    {item.link ? (
                      <a
                        href={item.link}
                        className='text-gray-300 hover:text-white transition-colors duration-200 whitespace-pre-line'
                        target={
                          item.link.startsWith("http") ? "_blank" : "_self"
                        }
                        rel={
                          item.link.startsWith("http")
                            ? "noopener noreferrer"
                            : ""
                        }
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className='text-gray-300 whitespace-pre-line'>
                        {item.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className='text-xl font-semibold mb-6'>Follow Us</h3>
              <div className='flex space-x-4'>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`w-12 h-12 ${social.color} rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <social.icon className='w-6 h-6 text-white' />
                  </a>
                ))}
              </div>
            </div>

            {/* Interactive Map */}
            <div className='mt-12 bg-gray-800 rounded-xl p-6'>
              <h4 className='text-lg font-semibold mb-4'>Find Us</h4>
              <div className='bg-gray-700 rounded-lg overflow-hidden h-64'>
                <iframe
                  src={churchInfo.googleMapsEmbed}
                  width='100%'
                  height='100%'
                  style={{ border: 0, borderRadius: "0.5rem" }}
                  allowFullScreen=''
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                  title={`${churchInfo.name} Location`}
                ></iframe>
              </div>
              <div className='mt-4 text-center'>
                <a
                  href={getGoogleMapsUrl()}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors'
                >
                  <MapPin className='w-4 h-4 mr-2' />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className='animate-fade-in'>
            <h3 className='text-2xl md:text-3xl font-bold mb-8'>
              Get In Touch
            </h3>

            {submitted ? (
              <div className='bg-green-600 text-white p-6 rounded-xl text-center'>
                <div className='w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Send className='w-8 h-8' />
                </div>
                <h4 className='text-xl font-semibold mb-2'>Message Sent!</h4>
                <p>Thank you for reaching out. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='space-y-6'>
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
