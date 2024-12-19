import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCategories,
    deleteCategory,
} from '@/Redux/ReduxSlice/categorySlice';
import { Category } from '@/Redux/ReduxSlice/Seletor';

const TABLE_HEADS = ['id category', 'Name category', 'Action'];

const ListViewCategory = () => {
    const dispatch = useDispatch();
    const categories = useSelector(Category); // Directly using the categories from Redux store

    // State for search query and pagination
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [povsPerPage, setPovsPerPage] = useState(5); // Default 5 categories per page
    const [sortOrder, setSortOrder] = useState('asc'); // Default sort order

    // Fetch categories when the component mounts
    useEffect(() => {
        const viewCate = async () => {
            try {
                dispatch(fetchCategories());
            } catch (error) {
                console.error(error);
            }
        }
        if(categories.length > 0){
            //có thông tin chỉ viêc hiển thị 
        }else{
            // chưa có thông tin gọi viewCate
            viewCate();
        }
    }, []);

    const handleDelete = (cateId) => {
        try {
            dispatch(deleteCategory(cateId));
        } catch (error) {
            alert(error.message);
        }
    };

    const handleSort = (column) => {
        const sortedCategories = [...categories].sort((a, b) => {
            if (column === 'id category') {
                return sortOrder === 'asc'
                    ? a.idCategory - b.idCategory
                    : b.idCategory - a.idCategory;
            } else if (column === 'Name category') {
                return sortOrder === 'asc'
                    ? a.nameCategory.localeCompare(b.nameCategory)
                    : b.nameCategory.localeCompare(a.nameCategory);
            }
            return 0;
        });

        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    // Filter categories based on the search query
    const filteredCategories = categories.filter((category) =>
        category.nameCategory.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    // Pagination Logic
    const indexOfLastCategory = currentPage * povsPerPage;
    const indexOfFirstCategory = indexOfLastCategory - povsPerPage;
    const currentCategories = filteredCategories.slice(
        indexOfFirstCategory,
        indexOfLastCategory,
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePovsPerPageChange = (e) => {
        setPovsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when items per page changes
    };

    return (
        <div>
            <section className="bg-cyan-600 rounded-md shadow-cyan-500/50 p-4 md:p-6">
                <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-[18px] text-sky-100">Danh sách thể loại</h4>
                    <div>
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="mt-2 p-2 w-full md:w-64 border border-gray-300 rounded"
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="text-sm">Categories per page: </label>
                    <select
                        value={povsPerPage}
                        onChange={handlePovsPerPageChange}
                        className="ml-2 p-2 border border-gray-300 rounded"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>

                <div className="rounded-lg border border-gray-950 overflow-x-auto scrollbar-thin scrollbar-track-[var(--scroll-track-bg-color)] scrollbar-thumb-gray-200">
                    <table className="min-w-[900px] w-full border-collapse text-zinc-900">
                        <thead className="text-left text-[17px] bg-slate-400">
                            <tr>
                                {TABLE_HEADS.map((th, index) => (
                                    <th
                                        key={index}
                                        className="px-3 py-3 cursor-pointer"
                                        onClick={() => handleSort(th)}
                                    >
                                        {th}
                                        {sortOrder === 'asc' ? ' ↑' : ' ↓'}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCategories.length > 0 ? (
                                currentCategories.map((category) => (
                                    <tr key={category.idCategory}>
                                        <td className="px-3 py-3">
                                            {category.idCategory}
                                        </td>
                                        <td className="px-3 py-3">
                                            {category.nameCategory}
                                        </td>
                                        <td className="px-3 py-3">
                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        category.idCategory,
                                                    )
                                                }
                                                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 transition duration-150"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="text-center py-3"
                                    >
                                        No categories available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4">
                    <nav>
                        <ul className="flex justify-center space-x-2">
                            {Array.from(
                                {
                                    length: Math.ceil(
                                        filteredCategories.length / povsPerPage,
                                    ),
                                },
                                (_, index) => (
                                    <li key={index + 1}>
                                        <button
                                            onClick={() => paginate(index + 1)}
                                            className="px-3 py-2 border rounded text-sm focus:outline-none focus:ring focus:ring-blue-300 hover:bg-blue-500 hover:text-white"
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ),
                            )}
                        </ul>
                    </nav>
                </div>
            </section>
        </div>
    );
};

export default ListViewCategory;
