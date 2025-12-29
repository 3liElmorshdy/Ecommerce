import { useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";

function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {

    setIsSubmitting(true);

 
    setTimeout(() => {
      toast.success("Thanks for contacting us! We'll get back to you shortly.", { position: "top-left" });
      setIsSubmitting(false);
 
    }, 600);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8">
       
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Customer Support</h2>
          <p className="text-gray-600 mb-4">
            We're here to help with orders, returns, and product questions.
          </p>

          <div className="space-y-4">
            <div>
              <span className="block text-sm text-gray-500">Email</span>
              <a href="mailto:alielmorshedy10@gmail.com" className="text-blue-600 hover:underline">
                alielmorshedy10@gmail.com
              </a>
            </div>

            <div>
              <span className="block text-sm text-gray-500">Phone</span>
              <a href="tel:01067219108" className="text-blue-600 hover:underline">
                01067219108
              </a>
            </div>

            <div>
              <span className="block text-sm text-gray-500">Working Hours</span>
              <p className="text-gray-700">Sat-Thu: 9:00 AM - 8:00 PM</p>
            </div>

            <div>
              <span className="block text-sm text-gray-500">Address</span>
              <p className="text-gray-700">123 E-Shop St, Cairo, Egypt</p>
            </div>
          </div>
        </div>

      
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Send us a message</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                minLength={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                minLength={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Order inquiry, product question, etc."
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us how we can help"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
