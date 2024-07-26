const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-blue-500 text-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-4xl font-bold text-center">TAQ Store Blog</h1>
      </header>
      <main className="container mx-auto">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Example blog post */}
          <article className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">Blog Post Title</h2>
            <p className="text-gray-700 mb-4">
              This is a brief description of the blog post content to give
              readers an idea of what the post is about.
            </p>
            <a href="#" className="text-blue-500 hover:underline">
              Read more...
            </a>
          </article>
          {/* Repeat the article block for more posts */}
        </div>
      </main>
      <footer className="bg-gray-800 text-white p-6 mt-6 rounded-lg shadow-lg">
        <p className="text-center">
          &copy; 2024 TAQ Store. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Blog;
