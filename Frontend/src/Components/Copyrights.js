import React from 'react';
import { Github, Instagram, Linkedin } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom';
import '../CSS/Copyrights.css'

const Copyrights = () => {

    // const 

    return (
        <div className='container'>
            <div className='footer fixed-bottom' id='footer' >
                <div>Copyright ©️ 2024 - All rights are reserved.</div>
                <div className='d-flex align-items-center'>
                    <div id='github-div'>
                        <Link to='https://github.com/ashokumaar/' target='_blank'>
                            <Github size='24' color='black' id='github' />
                        </Link>
                    </div>
                    <div id='instagram-div' style={{ background: 'linear-gradient(115deg, #f9ce34, #ee2a7b, #6228d7)', borderRadius: '50%' }}>
                        <Link to='https://www.instagram.com/ashok_veeraboyini?igsh=c2l4bmx5Z3AxZjMx' target='_blank' style={{ padding: '0 1px' }}>
                            <Instagram size='20' color='white' id='instagram' />
                        </Link>
                    </div>
                    <div id='linkedin-div'>
                        <Link to='https://www.linkedin.com/in/ashok-kumar-v-g-42994221a' target='_blank'>
                            <Linkedin size='23' id='linkedin' />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Copyrights;
