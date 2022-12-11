import { ChangeEventHandler, Dispatch, SetStateAction, useState } from "react";
import { useQuery } from "react-query";
import { ApiService } from "../../services/api.service";

interface SearchBarProps {
    setMenuModalOpen: Dispatch<SetStateAction<boolean>>;
    setSelectedCategory: Dispatch<SetStateAction<string>>
    selectedCategory: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
}

const apiService = new ApiService();
export const SearchBar = ({ handleChange, setMenuModalOpen, setSelectedCategory, selectedCategory }: SearchBarProps) => {
    const { data } = useQuery(['categories'], () => apiService.get(`categories`), {
        staleTime: 0.5 * 60 * 60 * 1000
    })
    const [dropdown, setDropdown] = useState(false);
    return (<>
        <div className="search-form   flex items-center space-x-4   mx-auto w-full
    transform duration-500 transition-all">
            <div className="flex bg-gray-100 rounded-lg my-2 mx-2 pl-4 p-2 w-full space-x-2  items-center">
                <div onClick={() => setMenuModalOpen(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                </div>

                <input
                    className="w-full py-2 px-2 bg-gray-50 outline-none border-transparent focus:border-transparent focus:ring-0 rounded-lg text-sm sm:text-base"
                    type="text" placeholder="Search for menu..."
                    onChange={handleChange} />

                <div className="dropdown dropdown-end dropdown-open">
                    <label tabIndex={0} className="btn btn-ghost btn-circle" onClick={() => setDropdown(value => !value)}>
                        <div className="indicator ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                        </div>
                    </label>
                    {dropdown && <div tabIndex={0} className="mt-3 card card-compact dropdown-content min-w-[200px]  bg-base-100 shadow z-50 ">
                        <div className="card-body mx-0 max-h-[450px] overflow-auto">
                            <p className={`p-1 rounded-md ${"all".toLocaleLowerCase() === selectedCategory.toLocaleLowerCase() ? 'bg-secondary' : ''}`} onClick={() => {setSelectedCategory("all".toLocaleLowerCase());setDropdown(false)}}>All</p>
                            {
                                data?.data?.data.map((category: any) => <p className={`p-1 rounded-md ${category.name.toLocaleLowerCase() === selectedCategory.toLocaleLowerCase() ? 'bg-secondary' : ''}`} key={category.id} onClick={() => { setSelectedCategory(category.name.toLocaleLowerCase()); setDropdown(false) }}>{category.name}</p>)
                            }

                        </div>
                    </div>}
                </div>
            </div>

        </div>
    </>)
}