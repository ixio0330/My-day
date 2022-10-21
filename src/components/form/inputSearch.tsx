import { FormEvent, useState } from 'react';

interface InputSearchProps {
  onSearch?: (params: string) => void;
}

export default function InputSearch({ onSearch }: InputSearchProps) {
  const [search, setSearch] = useState('');
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (onSearch) {
      onSearch(search);
    }
  }
  return (
    <form onSubmit={onSubmit} className='input_search'>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      <button className='saerch_icon'>🔍</button>
    </form>
  );
}