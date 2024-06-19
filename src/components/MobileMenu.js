import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChatBubbleOvalLeftEllipsisIcon, ClockIcon, Cog6ToothIcon, GlobeAltIcon, HomeIcon } from '@heroicons/react/24/outline'
import { Auth } from '../service/utils/auth'

const { userName } = new Auth()

const icons = [
    { 
        icon: HomeIcon, 
        link: '/', 
        isLink: true
    },
    { 
        icon: GlobeAltIcon,
        link: '/finding',
        isLink: true
    },
    { 
        icon: ClockIcon,
        link: '/group',
        isLink: true
    },
    { 
        icon: ChatBubbleOvalLeftEllipsisIcon,
        link: '/sidebar',
        isLink: true 
    },
    { 
        icon: Cog6ToothIcon,
        link: `/profile/${userName}`,
        isLink: true
    }
];

const MenuMobile = () => {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname)

    useEffect(() => {
        setActiveLink(location.pathname)
    }, [location]);

    return (
        <div className='flex border border-solid border-gray-400 justify-around p-5 rounded-[55px]'>
            {icons.map(({ icon: Icon, link, isLink }, index) => {
                const isActive = activeLink === link
                return isLink ? (
                    <Link key={index} to={link} onClick={() => setActiveLink(link)}>
                        <Icon className={`h-10 w-10 ${isActive ? 'text-[#008748]' : 'text-[#989394]'}`} />
                    </Link>
                ) : (
                    <Icon key={index} className={`h-10 w-10 ${isActive ? 'text-[#008748]' : 'text-[#989394]'}`} />
                );
            })}
        </div>
    );
};

export default MenuMobile; 