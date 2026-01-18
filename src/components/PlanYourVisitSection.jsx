import React from "react";
import {
  Clock,
  MapPin,
  Coffee,
  Users,
  Baby,
  ParkingCircle,
  Music,
  Book,
  Heart,
  Shirt,
} from "lucide-react";
import Button from "./Button";
import { churchInfo, serviceTimes, visitorInfo, getGoogleMapsUrl, getMailtoLink } from "../config/siteConfig";

const PlanYourVisitSection = ({ setActiveSection }) => {
  const whatToExpect = [
    {
      time: serviceTimes.sundaySchool.time,
      title: "Sunday School",
      icon: Book,
      description: serviceTimes.sundaySchool.description,
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      time: serviceTimes.worship.time,
      title: "Worship Service",
      icon: Music,
      description: serviceTimes.worship.description,
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600",
    },
    {
      time: serviceTimes.fellowship.time,
      title: "Fellowship Time",
      icon: Coffee,
      description: serviceTimes.fellowship.description,
      color: "bg-amber-50 border-amber-200",
      iconColor: "text-amber-600",
    },
  ];

  const practicalInfo = [
    {
      icon: MapPin,
      title: "Location",
      description: `${churchInfo.address.full}. We're located nearby. Look for our sign!`,
      action: "Get Directions",
      link: getGoogleMapsUrl(),
    },
    {
      icon: ParkingCircle,
      title: "Parking",
      description: visitorInfo.parkingInfo,
      action: null,
    },
    {
      icon: Shirt,
      title: "Dress Code",
      description: visitorInfo.dressCode,
      action: null,
    },
    {
      icon: Baby,
      title: "Children's Care",
      description:
        "We provide age-appropriate ministry for children during the service. A nursery is available for infants and toddlers.",
      action: null,
    },
  ];

  // Use FAQs from config
  const faqs = visitorInfo.faqs;

  return (
    <section className='py-16 lg:py-24 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Hero Section */}
        <div className='text-center mb-16 animate-fade-in'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
            Plan Your Visit
          </h2>
          <p className='text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8'>
            We'd love to have you join us for worship! Here's everything you
            need to know for your first visit to {churchInfo.name}.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              size='lg'
              onClick={() =>
                window.open(getGoogleMapsUrl(), "_blank")
              }
            >
              <MapPin className='w-5 h-5 mr-2' />
              Get Directions
            </Button>
            <Button
              variant='secondary'
              size='lg'
              onClick={() => setActiveSection("contact")}
            >
              <Heart className='w-5 h-5 mr-2' />
              Contact Us
            </Button>
          </div>
        </div>

        {/* What to Expect Timeline */}
        <div className='mb-20'>
          <h3 className='text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-12'>
            What to Expect on Sunday
          </h3>
          <div className='grid md:grid-cols-3 gap-8'>
            {whatToExpect.map((item, index) => (
              <div
                key={index}
                className={`${item.color} border-2 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
              >
                <div className='flex items-center mb-4'>
                  <div
                    className={`w-12 h-12 ${item.iconColor} bg-white rounded-full flex items-center justify-center mr-4 shadow-md`}
                  >
                    <item.icon className='w-6 h-6' />
                  </div>
                  <div>
                    <p className='text-sm font-semibold text-gray-600'>
                      {item.time}
                    </p>
                    <h4 className='text-xl font-bold text-gray-900'>
                      {item.title}
                    </h4>
                  </div>
                </div>
                <p className='text-gray-700 leading-relaxed'>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Practical Information */}
        <div className='mb-20'>
          <h3 className='text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-12'>
            Good to Know
          </h3>
          <div className='grid md:grid-cols-2 gap-8'>
            {practicalInfo.map((item, index) => (
              <div
                key={index}
                className='bg-white p-8 rounded-xl shadow-lg border-2 border-gray-100 hover:shadow-xl transition-shadow'
              >
                <div className='flex items-start'>
                  <div className='w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0'>
                    <item.icon className='w-6 h-6' />
                  </div>
                  <div className='flex-1'>
                    <h4 className='text-xl font-bold text-gray-900 mb-3'>
                      {item.title}
                    </h4>
                    <p className='text-gray-600 leading-relaxed mb-4'>
                      {item.description}
                    </p>
                    {item.action && item.link && (
                      <a
                        href={item.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:text-blue-700 font-medium inline-flex items-center'
                      >
                        {item.action} →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className='mb-16'>
          <h3 className='text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-12'>
            Frequently Asked Questions
          </h3>
          <div className='max-w-4xl mx-auto space-y-6'>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className='bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600'
              >
                <h4 className='font-bold text-lg text-gray-900 mb-3'>
                  {faq.question}
                </h4>
                <p className='text-gray-600 leading-relaxed'>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className='bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 lg:p-12 text-center'>
          <h3 className='text-2xl lg:text-3xl font-bold mb-6'>
            Still Have Questions?
          </h3>
          <p className='text-blue-100 mb-8 text-lg max-w-3xl mx-auto'>
            We're here to help! Feel free to reach out before your visit. We'd
            love to answer any questions and help you feel prepared and welcome.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              size='lg'
              className='bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold shadow-lg'
              onClick={() => setActiveSection("contact")}
            >
              Contact Us
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold'
              onClick={() =>
                (window.location.href = getMailtoLink())
              }
            >
              Email Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanYourVisitSection;
