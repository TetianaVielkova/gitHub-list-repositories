import { Input } from 'antd';
const { Search } = Input;

export default function SearchName({ handleSearch, searchText}) {

    const handleChange = (e) => {
        handleSearch(e.target.value);
      };

    return (
    <Search
        placeholder="Search by name"
        onSearch={handleSearch}
        onChange={handleChange}
        defaultValue={searchText}
    />
    );
}