import './Library.module.css';
import React, { useState } from 'react';

const Library = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample books data
  const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic' },
    { id: 2, title: '1984', author: 'George Orwell', genre: 'Science Fiction' },
    { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance' },
    { id: 4, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy' },
    { id: 5, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction' },
  ];

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-transparent border-2 border-white/20 backdrop-blur-lg shadow-lg rounded-lg p-8 text-white">
        <header className="flex justify-between items-center mb-8 pb-6 border-b border-white/20">
          <h1 className="text-4xl font-bold">Library Catalog</h1>
          <button 
            onClick={() => window.location.href = '/home'}
            className="px-6 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
          >
            Back to Home
          </button>
        </header>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search books by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 rounded-full bg-white/10 border-2 border-white/20 text-white placeholder-white/70 focus:outline-none focus:border-white/40"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map(book => (
            <div 
              key={book.id} 
              className="flex bg-white/10 rounded-lg p-6 transform transition-all hover:-translate-y-1"
            >
              <div className="w-24 h-36 bg-white/20 rounded mr-4 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                <p className="text-white/80 mb-2">By {book.author}</p>
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
                  {book.genre}
                </span>
                <button className="w-full px-4 py-2 bg-white/90 text-gray-800 rounded-full font-semibold hover:bg-white transition-all">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;