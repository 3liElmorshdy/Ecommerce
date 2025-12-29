import React from 'react'

function About() {
  return (
    <div className="container mx-auto px-4 py-10">
      <section className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">About E-Shop</h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          We’re on a mission to make online shopping fast, affordable, and enjoyable. From everyday essentials to trending products, we curate quality items at great prices with reliable delivery.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h3>
          <p className="text-gray-600">
            To deliver a seamless shopping experience with top-notch customer service, secure payments, and fast shipping.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">What We Offer</h3>
          <p className="text-gray-600">
            A wide range of categories, curated collections, exclusive deals, and trustworthy product reviews.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Promise</h3>
          <p className="text-gray-600">
            Transparent pricing, easy returns, and dedicated support to keep you satisfied with every purchase.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow p-6 mb-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why Shop With Us?</h3>
        <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold">•</span>
            Fast, reliable delivery across Egypt
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold">•</span>
            Secure checkout and multiple payment options
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold">•</span>
            Curated products with verified reviews
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold">•</span>
            Local support team ready to help
          </li>
        </ul>
      </section>

      <section className="grid md:grid-cols-4 gap-6 mb-12 text-center">
        <div className="bg-blue-50 rounded-lg p-6">
          <p className="text-3xl font-bold text-blue-600">50K+</p>
          <p className="text-gray-600">Satisfied Customers</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-6">
          <p className="text-3xl font-bold text-blue-600">10K+</p>
          <p className="text-gray-600">Products Available</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-6">
          <p className="text-3xl font-bold text-blue-600">500+</p>
          <p className="text-gray-600">Daily Orders</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-6">
          <p className="text-3xl font-bold text-blue-600">24/7</p>
          <p className="text-gray-600">Customer Support</p>
        </div>
      </section>

      <section className="text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Join Our Community</h3>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Follow us for exclusive deals and new arrivals. Your feedback helps us improve every day.
        </p>
        <a href="/home" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition">Start Shopping</a>
      </section>
    </div>
  )
}

export default About