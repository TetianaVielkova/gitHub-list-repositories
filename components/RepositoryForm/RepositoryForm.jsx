import { useForm } from 'react-hook-form';
import { boxErrorStyle, erorrsStyle, formStyle, inputStyle, labelStyle, selectStyle } from './RepositoryForm.style';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '../../utils/helpers/schemaForm';
import InputMask from 'react-input-mask';
import { Button } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const languageOptions = [
  { value: '', label: 'Select Language' },
  { value: 'HTML', label: 'HTML' },
  { value: 'CSS', label: 'CSS' },
  { value: 'SCSS', label: 'SCSS' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'TypeScript', label: 'TypeScript' },
];

export default function RepositoryForm({ onSubmit, closeModal}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const saveToLocalStorage = (data) => {
    try {
      const savedRepositories = JSON.parse(localStorage.getItem('repositories')) || [];
      const repositoryWithId = { id: uuidv4(), ...data };
      const updatedRepositories = [...savedRepositories, repositoryWithId];
      localStorage.setItem('repositories', JSON.stringify(updatedRepositories));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  const submitForm = (data) => {
    saveToLocalStorage(data);
    onSubmit(data); 
    closeModal(); 
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} style={formStyle}>
      <label style={labelStyle}>Repository Name:</label>
      <input
        type="text"
        placeholder="My-new-project"
        {...register('name')}
        style={inputStyle}
        autoComplete='true'
      />
      <div style={boxErrorStyle}>
        {errors.name && <span style={erorrsStyle}>{errors.name.message}</span>}
      </div>

      <label style={labelStyle}>Description:</label>
      <input
        type="text"
        {...register('description')}
        placeholder="Tell about your project..."
        style={inputStyle}
      />
      <div style={boxErrorStyle}>
        {errors.description && <span style={erorrsStyle}>{errors.description.message}</span>}
      </div>

      <label style={labelStyle} htmlFor="primaryLanguage">Primary Language:</label>
      <select
        id="primaryLanguage"
        {...register('primaryLanguage', {
          required: 'Repository name is required',
          })}
        style={selectStyle}
      >
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div style={boxErrorStyle}>
        {errors.primaryLanguage && <span style={erorrsStyle}>{errors.primaryLanguage.message}</span>}
      </div>

      <label style={labelStyle}>Updated At:</label>
      <InputMask
        mask="9999-99-99"
        placeholder="yyyy-mm-dd"
        {...register('updatedAt', { value: '' })}
        style={inputStyle}
      />
      <div style={boxErrorStyle}>
        {errors.updatedAt && <span style={erorrsStyle}>{errors.updatedAt.message}</span>}
      </div>
      
      <label style={labelStyle}>Commit Count:</label>
      <input
        type="number"
        placeholder="Example: 1"
        {...register('commitCount')}
        style={inputStyle}
      />
      <div style={boxErrorStyle}>
        {errors.commitCount && <span style={erorrsStyle}>{errors.commitCount.message}</span>}
      </div>
      <label style={labelStyle}>Default Branch:</label>
      <input
        type="text"
        placeholder=" Example: main"
        {...register('defaultBranch')}
        style={inputStyle}
      />
      <div style={boxErrorStyle}>
        {errors.defaultBranch && <span style={erorrsStyle}>{errors.defaultBranch.message}</span>}
      </div>
      <Button type="primary" htmlType="submit" style={{margin: '10px auto'}}>Add Repository</Button>
    </form>
  );
}