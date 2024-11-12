import './Home.module.css';
import React from 'react';

const Home = () => {
  const handleLogout = () => {
    window.location.href = '/';
  };

  const goToLibrary = () => {
    window.location.href = '/library';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-transparent border-2 border-white/20 backdrop-blur-lg shadow-lg rounded-lg p-8 text-white">
        <header className="flex justify-between items-center mb-10 pb-6 border-b border-white/20">
          <h1 className="text-4xl font-bold">Welcome to BookVerse</h1>
          <nav>
            <ul className="flex gap-4">
              <li>
                <button 
                  onClick={goToLibrary}
                  className="px-6 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
                >
                  Library
                </button>
              </li>
              <li>
                <button 
                  onClick={handleLogout}
                  className="px-6 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </header>
        
        <main>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Featured Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Featured Book 1 */}
              <div className="bg-white/10 rounded-lg p-6 text-center transform transition-all hover:-translate-y-1">
                <div className="w-32 h-48 mx-auto mb-4 bg-white/20 rounded"></div>
                <h3 className="text-xl font-semibold mb-2">The Great Gatsby</h3>
                <p className="text-white/80">F. Scott Fitzgerald</p>
              </div>
              
              {/* Featured Book 2 */}
              <div className="bg-white/10 rounded-lg p-6 text-center transform transition-all hover:-translate-y-1">
                <div className="w-32 h-48 mx-auto mb-4 bg-white/20 rounded"></div>
                <h3 className="text-xl font-semibold mb-2">1984</h3>
                <p className="text-white/80">George Orwell</p>
              </div>
              
              {/* Featured Book 3 */}
              <div className="bg-white/10 rounded-lg p-6 text-center transform transition-all hover:-translate-y-1">
                <div className="w-32 h-48 mx-auto mb-4 bg-white/20 rounded"></div>
                <h3 className="text-xl font-semibold mb-2">Pride and Prejudice</h3>
                <p className="text-white/80">Jane Austen</p>
              </div>
            </div>
          </section>
          
          <div className="flex justify-center gap-6">
            <button 
              onClick={goToLibrary}
              className="px-8 py-3 bg-white/90 text-gray-800 rounded-full font-semibold hover:bg-white hover:-translate-y-0.5 transition-all"
            >
              Browse Library
            </button>
            <button 
              className="px-8 py-3 bg-white/90 text-gray-800 rounded-full font-semibold hover:bg-white hover:-translate-y-0.5 transition-all"
            >
              My Reading List
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;