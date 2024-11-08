import { FaGithub, FaLinkedin, FaHackerrank } from 'react-icons/fa';
import { SiLeetcode, SiGeeksforgeeks } from 'react-icons/si';

function Footer() {
  return (
    <div className="bg-black text-white text-center py-6">
      
      <div className="flex justify-center space-x-6 z-50">
        <a href="https://github.com/Atif468" target="_blank" rel="noopener noreferrer" className="z-50 hover:text-gray-400 hover:cursor-pointer">
          <FaGithub size={24} />
        </a>
        <a href="https://www.linkedin.com/in/atif468" target="_blank" rel="noopener noreferrer" className="z-50 hover:text-blue-500 hover:cursor-pointer">
          <FaLinkedin size={24} />
        </a>
        <a href="https://leetcode.com/u/Atif_2005" target="_blank" rel="noopener noreferrer" className="z-50 hover:text-yellow-500 hover:cursor-pointer">
          <SiLeetcode size={24} />
        </a>
        <a href="https://www.geeksforgeeks.org/user/atifans468/" target="_blank" rel="noopener noreferrer" className="z-50 hover:text-green-500 hover:cursor-pointer">
          <SiGeeksforgeeks size={24} />
        </a>
        <a href="https://www.hackerrank.com/profile/Atif_22015001907" target="_blank" rel="noopener noreferrer" className="z-50 hover:text-green-300 hover:cursor-pointer">
          <FaHackerrank size={24} />
        </a>
      </div>
    </div>
  );
}

export default Footer;
