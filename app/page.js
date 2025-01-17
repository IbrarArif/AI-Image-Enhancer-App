"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ImageEditor from "../app/componets/ImageEditor";
import ThemeToggle from "../app/componets//ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 transition-colors duration-300">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">
          AI Image Enhancer
        </h1>
        <ThemeToggle />
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
            Transform Your Images with AI
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
            Upload your image and let our AI enhance it in seconds. Experience
            the power of AI-driven image transformation.
          </p>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ImageEditor />
        </motion.div>

        

        {/* <section className="mt-20 grid md:grid-cols-3 gap-8">
          {['Fast Processing', 'High-Quality Results', 'Easy to Use'].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">{feature}</h3>
              <p className="text-gray-600 dark:text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </motion.div>
          ))}
        </section> */}
      </main>

      <footer className="container  mx-auto px-4 py-6 mt-12 text-center text-gray-600 dark:text-gray-400">
        <p className="text-xl font-semibold mt-4 text-gray-700 dark:text-gray-300">
          Developed by{" "}
          <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-500">
            Malik Ibrar
          </span>
        </p>
        © 2024 AI Image Enhancer. All rights reserved.
      </footer>
    </div>
  );
}
