import icon from 'assets/images/icon.png';
import logo from 'assets/images/logo.png';
import "./Home.css";

export function Home() {
  return (
    <div className="page-home">
      <header className='home-header'>
        <img
          src={icon}
          className='icon'
          alt='Codeprac icon'
        />
        <img 
          src={logo}
          className='logo'
          alt="Codeprac logo"
        />
        <p className='splash-text'>
          is coming soon
        </p>
      </header>
    </div>
  )
}