// import { useState, useEffect } from 'react';
// import ThemeToggle from './ThemeToggle';

// const Navbar = () => {
//   const [activeSection, setActiveSection] = useState('about');

//   const scrollToSection = (sectionId: string) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({
//         behavior: 'smooth',
//         block: 'start'
//       });
//     }
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = ['about', 'projects', 'certificates', 'contact'];
//       const scrollPosition = window.scrollY + 100;

//       for (const section of sections) {
//         const element = document.getElementById(section);
//         if (element) {
//           const offsetTop = element.offsetTop;
//           const height = element.offsetHeight;
          
//           if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
//             setActiveSection(section);
//             break;
//           }
//         }
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navItems = [
//     { id: 'about', label: 'About' },
//     { id: 'projects', label: 'Projects' },
//     { id: 'certificates', label: 'Certificates' },
//     { id: 'contact', label: 'Contact' }
//   ];

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
//       <div className="container mx-auto px-6 py-4">
//         <div className="flex items-center justify-between">
//           <div className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
//             Portfolio
//           </div>
          
//           <div className="flex items-center gap-4">
//             <div className="hidden md:flex space-x-8">
//               {navItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => scrollToSection(item.id)}
//                   className={`relative py-2 px-4 text-sm font-medium transition-all duration-300 rounded-lg ${
//                     activeSection === item.id
//                       ? 'text-primary bg-primary/10'
//                       : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
//                   }`}
//                 >
//                   {item.label}
//                   {activeSection === item.id && (
//                     <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary rounded-full" />
//                   )}
//                 </button>
//               ))}
//             </div>

//             <ThemeToggle />
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button className="p-2 text-muted-foreground hover:text-primary">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle"; // Adjust path if needed
import { Link } from "react-scroll"; // For smooth scroll

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "home" },
    { name: "About", href: "about" },
    { name: "Projects", href: "projects" },
    { name: "Certificates", href: "certificates" },
    { name: "Contact", href: "contact" },
  ];

  // Close mobile menu automatically on window resize >= md
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed w-full bg-background z-50 shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Ishan Srivastava
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              smooth={true}
              duration={500}
              className="text-muted-foreground hover:text-primary cursor-pointer transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu with slide-down animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6 py-4 bg-background">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              smooth={true}
              duration={500}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-primary cursor-pointer transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
