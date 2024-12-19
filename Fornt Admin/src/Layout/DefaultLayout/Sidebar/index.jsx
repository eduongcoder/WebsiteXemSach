import { ImHome3 } from 'react-icons/im';
import { useContext, useState, useEffect, useRef } from 'react';
import { BiSolidCategory } from 'react-icons/bi';
import { MdBorderColor, MdOutlineCategory, MdGridView } from 'react-icons/md';
import { FaProductHunt, FaBook, FaUser } from 'react-icons/fa';
import { AiOutlineCustomerService } from 'react-icons/ai';
import { ThemeContext } from '@/ConText/ThemeConText';
import { Link } from 'react-router-dom';

function Sidebar() {
    const { theme } = useContext(ThemeContext);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    // Close sidebar when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <button
                onClick={toggleSidebar}
                data-drawer-target="default-sidebar"
                data-drawer-toggle="default-sidebar"
                aria-controls="default-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>
            <aside
                ref={sidebarRef}
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } sm:translate-x-0 ${
                    theme === 'dark'
                        ? 'bg-gray-800 text-white border-gray-700'
                        : 'bg-sky-600 text-blue-200 border-gray-200'
                } border-r rtl:border-r-0 rtl:border-l`}
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-sky-600 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                className="flex items-center p-2 text-blue-200 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                to="/"
                            >
                                <ImHome3 />
                                <span className="ms-3">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                to="/Chapter"
                            >
                                <BiSolidCategory />
                                <span className="ms-3">Chapter</span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                to="/Order"
                            >
                                <MdBorderColor />
                                <span className="ms-3">Home User</span>
                            </Link>
                        </li> */}
                        <li>
                            <Link
                                to="/Product"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <FaBook />
                                <span className="ms-3">Novel</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/Category"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <MdOutlineCategory />
                                <span className="ms-3">Category</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/Authors"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <FaUser />
                                <span className="ms-3">Authors</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/PointOfViews"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <FaProductHunt />
                                <span className="ms-3">Point Of Views</span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link
                                to="/textAll"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <AiOutlineCustomerService />
                                <span className="ms-3">Test</span>
                            </Link>
                        </li> */}
                        
                    </ul>
                </div>
            </aside>
        </div>
    );
}

export default Sidebar;
