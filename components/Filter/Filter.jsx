import { Select } from 'antd';

export default function Filter({ handleLanguageChange }) {

    return (
        <Select
            placeholder="Filter by Language"
            onChange={handleLanguageChange}
            style={{ width: 200, marginLeft: 12}}
            options={[
                { value: '', label: 'All' },
                { value: 'HTML', label: 'HTML' },
                { value: 'CSS', label: 'CSS' },
                { value: 'SCSS', label: 'SCSS' },
                { value: 'JavaScript', label: 'JAVASCRIPT' },
                { value: 'TypeScript', label: 'TYPESCRIPT' },
            ]}
        />
    );
}