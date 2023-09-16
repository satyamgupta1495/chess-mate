import { Container } from 'react-bootstrap'
import { SiGithub, SiLinkedin, SiTwitter } from 'react-icons/si'
import { PiInstagramLogoFill } from 'react-icons/pi'

function Footer() {
    return (
        <Container className='footer-section'>
            <footer className="text-center text-white" >
                <div>
                    <p className="d-flex justify-content-between align-items-center pt-3">
                        <span className="me-3">&copy; 2023 Chessmate</span>
                        <span className="me-3"><code> &lt;/&gt; </code> with ❤️ by Satyam Gupta</span>
                        <span className="me-3 text-white">
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
                        </span>
                    </p>
                </div>


            </footer>
        </Container>
    )
}

export default Footer