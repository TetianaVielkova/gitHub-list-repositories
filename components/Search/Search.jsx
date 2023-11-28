import { Input } from 'antd';
const { Search } = Input;


export default function SearchName({ handleSearch }) {
    const handleChange = (e) => {
        const searchText = e.target.value;
        handleSearch(searchText);
      };

    return (
    <Search
        placeholder="Search by name"
        onSearch={handleSearch}
        onChange={handleChange}
        style={{
            width: 400,
        }}
    />
    );
}

