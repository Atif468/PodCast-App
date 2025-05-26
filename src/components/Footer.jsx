import { FaGithub, FaLinkedin, FaHackerrank } from 'react-icons/fa';
import { SiLeetcode, SiGeeksforgeeks } from 'react-icons/si';

function Footer() {
  return (
    <footer className="text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
{/*           <div className="flex justify-center space-x-8">
            <a href="https://github.com/Atif468" target="_blank" rel="noopener noreferrer" 
               className="transform hover:scale-110 transition-transform duration-200 hover:text-gray-400">
              <FaGithub size={28} />
            </a>
            <a href="https://www.linkedin.com/in/atif468" target="_blank" rel="noopener noreferrer"
               className="transform hover:scale-110 transition-transform duration-200 hover:text-blue-500">
              <FaLinkedin size={28} />
            </a>
            <a href="https://leetcode.com/u/Atif_2005" target="_blank" rel="noopener noreferrer"
               className="transform hover:scale-110 transition-transform duration-200 hover:text-yellow-500">
              <SiLeetcode size={28} />
            </a>
            <a href="https://www.geeksforgeeks.org/user/atifans468/" target="_blank" rel="noopener noreferrer"
               className="transform hover:scale-110 transition-transform duration-200 hover:text-green-500">
              <SiGeeksforgeeks size={28} />
            </a>
            <a href="https://www.hackerrank.com/profile/Atif_22015001907" target="_blank" rel="noopener noreferrer"
               className="transform hover:scale-110 transition-transform duration-200 hover:text-green-300">
              <FaHackerrank size={28} />
            </a>
          </div> */}
          <div className="mt-4 text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} PodCast-App. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
