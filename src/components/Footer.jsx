export default function Footer({ setActiveSection }) {
  return (
    <footer className='bg-gray-800 text-white py-12 mt-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid md:grid-cols-3 gap-8 mb-8'>
          <div>
            <div className='mb-4'>
              <img
                src='/NL_Logo_300.png'
                className='h-20 w-auto mb-4'
                alt='New Life Bible Fellowship Church Logo'
              />
            </div>
            <p className='text-gray-400 italic mb-4'>
              "To pursue God's glory in all things among all people"
            </p>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>Quick Links</h4>
            <nav className='space-y-2' aria-label='Footer navigation'>
              <button
                onClick={() => setActiveSection("about")}
                className='block text-gray-400 hover:text-white text-sm'
              >
                About
              </button>
              <button
                onClick={() => setActiveSection("beliefs")}
                className='block text-gray-400 hover:text-white text-sm'
              >
                Our Beliefs
              </button>
              <button
                onClick={() => setActiveSection("visit")}
                className='block text-gray-400 hover:text-white text-sm'
              >
                Plan a Visit
              </button>
              <button
                onClick={() => setActiveSection("sermons")}
                className='block text-gray-400 hover:text-white text-sm'
              >
                Sermons
              </button>
              <button
                onClick={() => setActiveSection("events")}
                className='block text-gray-400 hover:text-white text-sm'
              >
                Events
              </button>
              <button
                onClick={() => setActiveSection("ministries")}
                className='block text-gray-400 hover:text-white text-sm'
              >
                Ministries
              </button>
              <button
                onClick={() => setActiveSection("smallgroups")}
                className='block text-gray-400 hover:text-white text-sm'
              >
                Small Groups
              </button>
              <button
                onClick={() => setActiveSection("membership")}
                className='block text-gray-400 hover:text-white text-sm'
              >
                Membership
              </button>
              <button
                onClick={() => setActiveSection("giving")}
                className='block text-gray-400 hover:text-white text-sm'
              >
                Give
              </button>
            </nav>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>Contact</h4>
            <address className='not-italic text-gray-400 text-sm space-y-1'>
              <p>24771 Cannon Rd</p>
              <p>Millsboro, DE 19966</p>
              <p>(302)945-8145</p>
            </address>
          </div>
        </div>
        <div className='border-t border-gray-700 pt-8 text-center'>
          <p className='text-gray-400 text-sm'>
            © {new Date().getFullYear()} New Life Bible Fellowship Church. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
