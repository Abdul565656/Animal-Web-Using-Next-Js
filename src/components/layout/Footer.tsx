import Link from 'next/link';
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { ArrowRight } from 'lucide-react';

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/', label: 'About Us' },
  { href: '/', label: 'Properties' },
  { href: '/', label: 'Agents' },
];

const helpLinks = [
  { href: '/', label: 'Customer Support' },
  { href: '/', label: 'How It Works' },
  { href: '/', label: 'Terms & Condition' },
  { href: '/', label: 'Testimonials' },
];

const legalLinks = [
  { href: '/', label: 'Trams & Condition' },
  { href: '/', label: 'Privacy policy' },
  { href: '/', label: 'Contact Us' },
];

const socialLinks = [
  { href: 'https://linkedin.com', icon: FaLinkedinIn, label: 'LinkedIn' },
  { href: 'https://facebook.com', icon: FaFacebookF, label: 'Facebook' },
  { href: 'https://instagram.com', icon: FaInstagram, label: 'Instagram' },
  { href: 'https://twitter.com', icon: FaTwitter, label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="bg-foco-amber text-black pt-12 pb-8 w-full">
      <div className="max-w-6xl mx-auto px-4 flex flex-col min-h-[420px] justify-between">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
          {/* Left: Newsletter & Social */}
          <div className="flex-1 min-w-[230px]">
            <h3 className="font-bold text-[17px] mb-4">Stay Posted To Receive Updates</h3>
            <form className="flex items-center border-b border-black max-w-xs mb-7 p-2">
              <input
                type="email"
                placeholder="Enter your email..."
                className="bg-transparent flex-1 py-2 px-0 focus:outline-none text-sm placeholder-black"
              />
              <button
                type="submit"
                className="ml-2 bg-orange-500 hover:bg-orange-600 rounded-full p-2 transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </form>
            <h3 className="font-bold text-[17px] mb-2">Social</h3>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="bg-black text-white rounded-full p-2 hover:scale-110 transition-transform"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>


          <div className="flex-1 flex flex-row gap-32 justify-end min-w-[230px] p-6">
            <div>
              <h3 className="font-bold text-[17px] mb-4">Navigation</h3>
              <ul className="space-y-2 font-extralight">
                {navigationLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:underline">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-[17px] mb-4">Help</h3>
              <ul className="space-y-2 font-extralight">
                {helpLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:underline">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>


        <div className="flex-1 flex flex-row items-center justify-center">
            {/* Pawprint SVG */}
            <svg width="90" height="70" viewBox="0 0 90 70" fill="none" className="mb-2">
              <ellipse cx="45" cy="55" rx="22" ry="13" stroke="black" strokeWidth="3" />
              <ellipse cx="18" cy="33" rx="7" ry="11" stroke="black" strokeWidth="3" />
              <ellipse cx="72" cy="33" rx="7" ry="11" stroke="black" strokeWidth="3" />
              <ellipse cx="31" cy="17" rx="6" ry="9" stroke="black" strokeWidth="3" />
              <ellipse cx="59" cy="17" rx="6" ry="9" stroke="black" strokeWidth="3" />
            </svg>
            <span
              className="text-[56px] sm:text-[100px] md:text-[200px] font-extrabold tracking-tight"
              style={{
                fontFamily: "'Luckiest Guy', 'Comic Sans MS', cursive, sans-serif",
                WebkitTextStroke: '3px black',
                color: 'transparent',
                letterSpacing: '0.04em',
                lineHeight: 1,
              }}>
              FocoPet
            </span>
          </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 border-0 pt-4 text-xs">
          <span className="mb-2 sm:mb-0 text-black">© Tooth Fairy 12B. All Rights Reserved 2024.</span>
          <ul className="flex space-x-6 text-black">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:underline">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
