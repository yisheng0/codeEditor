import { Select, Typography } from 'antd';
import { LANGUAGE_VERSIONS, Language } from '../constant.ts';

const { Text } = Typography;
const languages = Object.entries(LANGUAGE_VERSIONS);

interface LanguageSelectorProps {
  language: Language;
  onSelect: (value: Language) => void;
}

const LanguageSelector = ({ language , onSelect}: LanguageSelectorProps) => {
  return (
    <div style={{ marginLeft: '8px', marginBottom: '16px' }}>
      <Text style={{ marginBottom: '8px', fontSize: '16px',color: 'gray' }}>Language:</Text>
      <br /><br />
      <Select
        value={language}
        onChange={onSelect}
        style={{ width: 140, backgroundColor: '#47444F' }}
        dropdownStyle={{ backgroundColor: '#110c1b' }}
      >
        {languages.map(([lang, version]) => (
          <Select.Option key={lang} value={lang} style={{ color: lang === language ? 'blue' : 'inherit' }}>
            {lang}
            <span style={{ color: 'gray', fontSize: '12px' }}> ({version})</span>
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default LanguageSelector;
