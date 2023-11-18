import { Select } from 'antd';

    export default function Sort({ handleSortChange }) {
        return (
            <Select
                placeholder="Sort by..."
                onChange={handleSortChange}
                style={{ width: 200, marginRight: 12}}
                options={[
                    { value: 'alphabetical', label: 'A-Z' },
                    { value: 'date', label: 'Date Updated' },
                ]}
            />
        );
    }
