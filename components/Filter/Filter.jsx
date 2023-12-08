import { Select } from 'antd';

export default function Filter({ handleLanguageChange, filteredLanguages }) {
  let selectedLanguages = [];

  if (Array.isArray(filteredLanguages)) {
    selectedLanguages = filteredLanguages.filter(lang => typeof lang === 'string' && lang.trim() !== '');
  } else if (typeof filteredLanguages === 'string' && filteredLanguages.trim() !== '') {
    selectedLanguages = filteredLanguages.split(',').map(lang => lang.trim());
  }

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
      value={selectedLanguages}
    />
  );
}