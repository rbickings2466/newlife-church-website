import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

const EventsSection = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Adult Sunday School",
      date: "Every Sunday",
      time: "9:30 AM",
      location: "Fellowship Hall",
      description: "Join us for Fellowship around Biblical Teachings.",
      recurring: true,
    },
    {
      id: 2,
      title: "Sunday Worship Service",
      date: "Every Sunday",
      time: "10:30 AM",
      location: "Sanctuary",
      description:
        "Corporate Worship, Prayer, Scripture Reading, and Expository Preaching.",
      recurring: true,
    },
    {
      id: 3,
      title: "Fellowship Time",
      date: "Every Sunday",
      time: "12:30 PM",
      location: "Fellowship Hall",
      description: "A great time of food and fellowship.",
      recurring: true,
    },
  ];

  return (
    <section className='py-16 lg:py-24 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12 animate-fade-in'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
            Upcoming Events
          </h2>
          <p className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto'>
            Join us for worship, fellowship, and community events
          </p>
        </div>

        {/* Regular Events Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
          {upcomingEvents.map((event, index) => (
            <div
              key={event.id}
              className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in'
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className='flex items-start justify-between mb-4'>
                <h3 className='text-xl font-bold text-gray-900 flex-1'>
                  {event.title}
                </h3>
                {event.recurring && (
                  <span className='bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium ml-2'>
                    Recurring
                  </span>
                )}
              </div>

              <div className='space-y-3 mb-4'>
                <div className='flex items-center text-gray-600'>
                  <Calendar className='w-4 h-4 mr-2 text-blue-600' />
                  <span className='text-sm'>{event.date}</span>
                </div>
                <div className='flex items-center text-gray-600'>
                  <Clock className='w-4 h-4 mr-2 text-blue-600' />
                  <span className='text-sm'>{event.time}</span>
                </div>
                <div className='flex items-center text-gray-600'>
                  <MapPin className='w-4 h-4 mr-2 text-blue-600' />
                  <span className='text-sm'>{event.location}</span>
                </div>
              </div>

              <p className='text-gray-600 text-sm leading-relaxed'>
                {event.description}
              </p>
            </div>
          ))}
        </div>

        {/* Church Calendar */}
        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
          <div className='p-6 bg-blue-600 text-white'>
            <h3 className='text-xl font-semibold flex items-center'>
              <Calendar className='w-6 h-6 mr-3' />
              Full Church Calendar
            </h3>
            <p className='text-blue-100 mt-2'>
              View all upcoming events and activities
            </p>
          </div>
          <div className='p-6'>
            <iframe
              src='https://newlifebfcde.churchcenter.com/calendar?embed=true&view=month'
              className='w-full h-96 border-0 rounded-lg'
              title='Church Calendar'
              loading='lazy'
            ></iframe>
          </div>
        </div>

        {/* Service Times Card */}
        <div className='mt-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 lg:p-12'>
          <div className='text-center'>
            <h3 className='text-2xl lg:text-3xl font-bold mb-6'>
              Regular Service Times
            </h3>
            <div className='grid md:grid-cols-2 gap-6'>
              <div className='bg-blue-900 bg-opacity-50 rounded-lg p-6 border-2 border-white border-opacity-30'>
                <h4 className='font-semibold text-white text-lg mb-2'>
                  Sunday School
                </h4>
                <p className='text-blue-100 text-lg font-medium'>9:30 AM</p>
              </div>
              <div className='bg-blue-900 bg-opacity-50 rounded-lg p-6 border-2 border-white border-opacity-30'>
                <h4 className='font-semibold text-white text-lg mb-2'>
                  Sunday Worship
                </h4>
                <p className='text-blue-100 text-lg font-medium'>10:30 AM</p>
              </div>
              {/* <div className='bg-white bg-opacity-10 rounded-lg p-6'>
                <h4 className='font-semibold text-lg mb-2'>Wednesday Prayer</h4>
                <p className='text-blue-100'>7:00 PM</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
