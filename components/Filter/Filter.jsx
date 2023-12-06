import { Select } from 'antd';

export default function Filter({ handleLanguageChange, filteredLanguages }) {
  return (
    <Select
      mode="multiple"
      allowClear
      placeholder="Filter by Language"
      onChange={handleLanguageChange}
      style={{ width: '100%' }}
      options={[
        { value: 'HTML', label: 'HTML' },
        { value: 'CSS', label: 'CSS' },
        { value: 'SCSS', label: 'SCSS' },
        { value: 'JavaScript', label: 'JavaScript' },
        { value: 'TypeScript', label: 'TypeScript' },
      ]}
      value={filteredLanguages.length ? filteredLanguages : []}
    />
  );
}