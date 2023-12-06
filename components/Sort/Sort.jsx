import { Select } from 'antd';

export default function Sort({ handleSortChange, sortingOption }) {
    return (
        <Select
            placeholder="Sort by..."
            onChange={handleSortChange}
            style={{ width: '100%' }}
            options={[
                { value: 'alphabetical', label: 'A-Z' },
                { value: 'date', label: 'Date Updated' },
            ]}
            value={sortingOption.length ? sortingOption : []} 
        />
    );
}
