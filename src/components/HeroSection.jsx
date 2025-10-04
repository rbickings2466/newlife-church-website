import React, { useState } from "react";
import { Youtube, Cross } from "lucide-react";
import Button from "./Button";
import GospelModal from "./GospelModal";
import heroBg from "../assets/nl_santuary_wide.jpg";

const HeroSection = ({ setActiveSection }) => {
  const [isGospelModalOpen, setIsGospelModalOpen] = useState(false);
  return (
    <section
      className='relative text-white overflow-hidden bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <div className='absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black opacity-40'></div>

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32'>
        <div className='text-center animate-fade-in'>
          <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight'>
            Welcome to <span className='text-yellow-300'>New Life</span>
          </h1>
          <p className='text-xl md:text-2xl lg:text-3xl mb-8 italic font-light max-w-4xl mx-auto leading-relaxed'>
            "To pursue God's glory in all things among all people"
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center mt-8'>
            <Button
              size='lg'
              onClick={() => setIsGospelModalOpen(true)}
              className='transform hover:scale-105 transition-transform duration-200 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold'
            >
              <Cross className='w-5 h-5 mr-2' />
              Learn About the Gospel
            </Button>
            <Button
              size='lg'
              onClick={() => setActiveSection("about")}
              className='transform hover:scale-105 transition-transform duration-200'
            >
              Learn More About Us
            </Button>
            <Button
              variant='secondary'
              size='lg'
              onClick={() =>
                window.open(
                  "https://www.youtube.com/channel/UChfYNpsG6ciJa_N6aBryi_Q",
                  "_blank"
                )
              }
              className='transform hover:scale-105 transition-transform duration-200'
            >
              <Youtube className='w-5 h-5 mr-2' />
              Watch Live Service
            </Button>
          </div>

          <GospelModal
            isOpen={isGospelModalOpen}
            onClose={() => setIsGospelModalOpen(false)}
          />
        </div>
      </div>

      {/* Decorative bottom fade */}
      <div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent'></div>
    </section>
  );
};

export default HeroSection;
