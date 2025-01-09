import './App.css';
import logo from '@assets/logo.png';

function App() {
  return <header className="flex justify-between
  items-center text-black py-6 px-8
  md:px-32 bg-white drop-shadow-md">
    <a href="#">
      <img src={logo} alt="" className="w-52 
      hover:scale-105 transition-all"/>
    </a>

    <ul className="hidden xl:flex items-center
    gap-12 font-semibold text-base">
      <li>로그인/회원가입</li>
      <li>ABOUT</li>
      <li>CONTACT</li>
    </ul>
  </header>
}

export default App;
