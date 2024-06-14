import { SiGithub, SiLinkedin, SiTwitter } from 'react-icons/si'
import { PiInstagramLogoFill } from 'react-icons/pi'

function Footer() {
    return (
        <footer className='footer-content'>
            <div className="d-flex copyright">
                <p className="pt-3">
                    <span>&copy; 2024 Chessmate</span>
                </p>
            </div>
            <div className='dev-message'>
                <span><code> &lt;/&gt; </code> with ❤️ by Satyam Gupta</span>
            </div>
            <div className="socials-links">
                <a href="https://github.com/satyamgupta1495" target="_blank" rel="noreferrer">
                    <SiGithub className='social-icon' />
                </a>
                <a href="https://www.linkedin.com/in/satyamgupta1495/" target="_blank" rel="noreferrer">
                    <SiLinkedin className='social-icon' />
                </a>
                <a href="https://twitter.com/_Satyam_gupta_" target="_blank" rel="noreferrer">
                    <SiTwitter className='social-icon' />
                </a>
                <a href="https://www.instagram.com/_1amsatyamgupta_/" target="_blank" rel="noreferrer">
                    <PiInstagramLogoFill className='social-icon' />
                </a>
            </div>
        </footer>
    )
}

export default Footer