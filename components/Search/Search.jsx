import { Input } from 'antd';
const { Search } = Input;

export default function SearchName({ handleSearch, handleChange}) {
    return (
    <Search
        placeholder="Search by name"
        onSearch={handleSearch}
        onChange={handleChange}
    />
    );
}