import React from 'react';

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-blue-500 text-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-4xl font-bold text-center">TAQ Eyewear Blog</h1>
        <p className="text-center text-lg mt-2">
          Khám phá những tin tức mới nhất, mẹo chăm sóc kính mắt và xu hướng thời trang từ TAQ Eyewear.
        </p>
      </header>
      <main className="container mx-auto">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Example blog post 1 */}
          <article className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">5 Xu Hướng Kính Mắt Nổi Bật Năm 2024</h2>
            <p className="text-gray-700 mb-4">
              Tìm hiểu về những xu hướng kính mắt mới nhất trong năm 2024. Từ kiểu dáng hiện đại đến những chất liệu độc đáo, chúng tôi sẽ giới thiệu những mẫu kính mắt không thể bỏ qua.
            </p>
            <a href="#" className="text-blue-500 hover:underline">
              Đọc thêm...
            </a>
          </article>
          
          {/* Example blog post 2 */}
          <article className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">Hướng Dẫn Chọn Kính Mắt Phù Hợp Với Khuôn Mặt</h2>
            <p className="text-gray-700 mb-4">
              Việc chọn kính mắt phù hợp với khuôn mặt có thể nâng tầm phong cách của bạn. Khám phá các mẹo và hướng dẫn để tìm ra cặp kính hoàn hảo cho bạn.
            </p>
            <a href="#" className="text-blue-500 hover:underline">
              Đọc thêm...
            </a>
          </article>

          {/* Example blog post 3 */}
          <article className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">Cách Bảo Quản Kính Mắt Để Sử Dụng Lâu Dài</h2>
            <p className="text-gray-700 mb-4">
              Đảm bảo rằng kính mắt của bạn luôn ở trong tình trạng tốt nhất với những mẹo bảo quản đơn giản. Từ việc vệ sinh đến lưu trữ, chúng tôi sẽ giúp bạn giữ cho kính mắt luôn như mới.
            </p>
            <a href="#" className="text-blue-500 hover:underline">
              Đọc thêm...
            </a>
          </article>
        </div>
      </main>
      <footer className="bg-gray-800 text-white p-6 mt-6 rounded-lg shadow-lg">
        <p className="text-center">
          &copy; 2024 TAQ Eyewear. Bảo lưu mọi quyền.
        </p>
        <p className="text-center mt-2">
          Liên hệ với chúng tôi qua email: <a href="mailto:info@taqeyewear.com" className="text-blue-300 hover:underline">info@taqeyewear.com</a>
        </p>
      </footer>
    </div>
  );
};

export default Blog;
