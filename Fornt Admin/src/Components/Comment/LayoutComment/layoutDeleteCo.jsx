import React, { useState } from 'react';
import { DeleteComment } from '@/Redux/ReduxSlice/CommentSlice';
import { useDispatch } from 'react-redux';
const DeleteLayoutCom = ({idComment}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    // Hàm để mở/đóng modal
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {/* Nút mở modal */}
            <div className="flex justify-center m-5">
                <button
                    onClick={toggleModal}
                    className="block text-black bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    type="button"
                >
                    Show delete confirmation
                </button>
            </div>

            {/* Modal */}
            {isOpen && (
                <div
                    id="deleteModal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-md">
                        {/* Nội dung modal */}
                        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                            {/* Nút đóng modal */}
                            <button
                                onClick={toggleModal}
                                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            {/* Icon */}
                            <svg
                                className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            {/* Nội dung câu hỏi */}
                            <p className="mb-4 text-gray-500 dark:text-gray-300">
                                Are you sure you want to delete this item?
                            </p>
                            {/* Các nút xác nhận */}
                            <div className="flex justify-center items-center space-x-4">
                                <button
                                    onClick={toggleModal}
                                    className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                >
                                    No, cancel
                                </button>
                                <button
                                    type="button"
                                    className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                                    onClick={async () =>{
                                        await dispatch(
                                            DeleteComment(idComment),
                                        )
                                        toggleModal();
                                    }}
                                >
                                    Yes, I'm sure
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteLayoutCom;
