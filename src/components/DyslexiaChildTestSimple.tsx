import React from 'react';

const DyslexiaChildTestSimple: React.FC = () => {
  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold text-purple-600 mb-4">
          🧠 Test Dyslexia cho trẻ 4-5 tuổi
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Đây là trang test Dyslexia. Component đang hoạt động!
        </p>
        <button 
          onClick={() => window.history.back()}
          className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition"
        >
          ← Quay lại
        </button>
      </div>
    </div>
  );
};

export default DyslexiaChildTestSimple;
