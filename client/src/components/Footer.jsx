import React from 'react'
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-blue-100 to-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
            {/* Divider Line */}
            <hr className="border-t border-gray-300 mb-4" />
            
            {/* Tagline */}
            <p className="text-gray-600 text-sm mb-4">
            Crafted with curiosity, fueled by passion, and launched with purpose.
            </p>

            {/* Social Links */}
            <div className="flex justify-center space-x-4 mb-4">
            <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 transition-colors"
                title="GitHub"
            >
                <Github className="h-6 w-6" />
            </a>
            <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 transition-colors"
                title="LinkedIn"
            >
                <Linkedin className="h-6 w-6" />
            </a>
            <a
                href="mailto:your-email@example.com"
                className="text-gray-500 hover:text-blue-600 transition-colors"
                title="Email"
            >
                <Mail className="h-6 w-6" />
            </a>
            </div>

            {/* Copyright */}
            <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} Balloon Mail. All Rights Reserved.
            </p>
        </div>
    </footer>
  )
}

export default Footer;