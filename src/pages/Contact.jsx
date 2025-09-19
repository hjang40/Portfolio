import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import exitImg from "../assets/images/exit.png";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await emailjs.send(
        "service_3pjafyh",
        "template_8717rqo",
        formData, // This must match your template variables
        "YUu5oiMyx834ATfmr"
      );

      console.log("Email sent:", result.text);
      setSubmitStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Email error:", error);
      setSubmitStatus("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  const contactMethods = [
    {
      type: "Email",
      value: "hyun@gmail.com",
      icon: "📧",
    },
    {
      type: "LinkedIn",
      value: "www.linkedin.com/in/hyun-jang",
      icon: "💼",
    },
    {
      type: "GitHub",
      value: "github.com/hjang40",
      icon: "💻",
    },
    {
      type: "Phone",
      value: "(301) 377 - 2321",
      icon: "📱",
    },
  ];

  return (
    <div className="w-full h-screen bg-[#88c0d0] flex items-center justify-center">
      {/* Main dialogue box */}
      <div className="relative w-[80%] h-[80%] bg-[#cce7ff] rounded-lg border-4 border-[#333] p-6 flex flex-col justify-between shadow-lg">
        {/* Title bar */}
        <div className="w-full h-20 bg-[#0055aa] rounded-t-lg flex items-center justify-center">
          <h1 className="font-pokemon text-yellow-300 text-2xl drop-shadow-md">
            CONTACT
          </h1>
        </div>

        {/* Main content */}
        <div className="flex flex-1 mt-4 gap-6 p-4 rounded-lg border-4 border-[#333] overflow-y-auto">
          {/* Left side - Contact Info */}
          <div className="flex-1 space-y-4">
            <div className="bg-white rounded-lg p-4 border-2 border-[#333]">
              <h2 className="font-pokemon text-lg text-black mb-4 text-center drop-shadow">
                GET IN TOUCH
              </h2>

              <div className="space-y-3">
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 bg-[#f0f8ff] rounded border border-[#ccc]"
                  >
                    <span className="text-2xl">{method.icon}</span>
                    <div>
                      <div className="font-pokemon text-sm text-gray-600">
                        {method.type}
                      </div>
                      <div className="font-pokemon text-sm text-black">
                        {method.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick message */}
            <div className="bg-white rounded-lg p-4 border-2 border-[#333]">
              <p className="font-pokemon text-sm text-black break-words">
                I'm always excited to connect with fellow developers,
                researchers, and anyone interested in the intersection of
                technology and neuroscience. Whether you want to collaborate on
                a project, discuss ideas, or just say hello, feel free to reach
                out!
              </p>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div className="flex-1">
            <div className="bg-white rounded-lg p-4 border-2 border-[#333] h-full">
              <h2 className="font-pokemon text-lg text-black mb-4 text-center drop-shadow">
                SEND MESSAGE
              </h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-4 h-full flex flex-col"
              >
                <div>
                  <label className="font-pokemon text-sm text-black block mb-1">
                    Trainer Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border-2 border-[#333] rounded font-pokemon text-sm focus:border-[#0055aa] focus:outline-none"
                    placeholder="Enter your name..."
                  />
                </div>

                <div>
                  <label className="font-pokemon text-sm text-black block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border-2 border-[#333] rounded font-pokemon text-sm focus:border-[#0055aa] focus:outline-none"
                    placeholder="Enter your email..."
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <label className="font-pokemon text-sm text-black block mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="flex-1 p-2 border-2 border-[#333] rounded font-pokemon text-sm resize-none focus:border-[#0055aa] focus:outline-none"
                    placeholder="What would you like to say..."
                    rows={6}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full h-12 rounded-md font-pokemon text-white text-lg drop-shadow-md transition duration-200 ease-in-out ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#ee2222] hover:brightness-110 hover:scale-105 cursor-pointer"
                  }`}
                >
                  {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                </button>

                {/* Status message */}
                {submitStatus && (
                  <div className="text-center font-pokemon text-sm text-green-600 bg-green-100 p-2 rounded border border-green-300">
                    {submitStatus}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Buttons / Navigation */}
        <div className="flex justify-center mt-4 gap-6">
          {[
            { label: "About", to: "/about" },
            { label: "Projects", to: "/projects" },
            { label: "Home", to: "/" },
          ].map((btn) => (
            <NavLink key={btn.to} to={btn.to}>
              <div
                className="w-32 h-12 bg-[#ee2222] rounded-md flex items-center justify-center font-pokemon text-white text-lg drop-shadow-md 
                           transition duration-200 ease-in-out hover:brightness-110 hover:scale-105 cursor-pointer"
              >
                {btn.label}
              </div>
            </NavLink>
          ))}
        </div>

        {/* Exit button */}
        <button
          className="absolute top-2 right-2 w-10 h-10 hover:brightness-110 transition"
          onClick={() => window.history.back()}
        >
          <img src={exitImg} alt="Exit" className="w-full h-full" />
        </button>
      </div>
    </div>
  );
};

export default Contact;
