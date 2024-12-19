import React, { useState } from 'react';
import axios from 'axios';

const ChapForm = () => {
    const [file, setFile] = useState(null);
    const [title_Chapter, setTitle_Chapter] = useState('');
    const [number_Chapter, setNumber_Chapter] = useState('');
    const [novelName, setNovelName] = useState('');
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append(
            'request',
            new Blob(
                [
                    JSON.stringify({
                        novelName,
                        title_Chapter,
                        number_Chapter,
                    }),
                ],
                { type: 'application/json' },
            ),
        );

        try {
            const response = await axios.post(
                'http://26.232.136.42:8080/api/chapter/createChapter',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error uploading novel:', error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"
        >
            <input type="file" onChange={handleFileChange} required />
            <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                type="text"
                value={novelName}
                onChange={(e) => setNovelName(e.target.value)}
                placeholder="Novel Name"
                required
            />
            <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                type="text"
                value={title_Chapter}
                onChange={(e) => setTitle_Chapter(e.target.value)}
                placeholder="Title Chapter"
                required
            />
            <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                type="text"
                value={number_Chapter}
                onChange={(e) => setNumber_Chapter(e.target.value)}
                placeholder="Number Chapter"
                required
            />
            <button
                type="submit"
                className="px-8 py-2.5 leading-5 text-white bg-gray-700 rounded-md hover:bg-gray-600"
            >
                Submit
            </button>
        </form>
    );
};

export default ChapForm;
