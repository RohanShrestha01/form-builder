import { useEffect, useState } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import Input from '../ui/Input';

interface Props {
  placeholder: string;
  className?: string;
  disabled?: boolean;
  debounce?: boolean;
}

export default function SearchInput({
  placeholder,
  className = '',
  disabled = false,
  debounce = false,
}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('query') ?? '');

  useEffect(() => {
    // Not debounce when search is cleared
    if (search === '') {
      searchParams.delete('query');
      setSearchParams(searchParams);
      return;
    }

    if (!debounce)
      setSearchParams(searchParams => {
        searchParams.set('query', search);
        return searchParams;
      });

    const timerId = setTimeout(
      () =>
        setSearchParams(searchParams => {
          searchParams.set('query', search);
          return searchParams;
        }),
      500,
    );

    return () => clearTimeout(timerId);
  }, [search, searchParams, setSearchParams, debounce]);

  return (
    <div className={`relative flex items-center ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={e => setSearch(e.target.value)}
        spellCheck="false"
        className="peer px-10"
        disabled={disabled}
      />
      <SearchIcon className="absolute left-2.5 h-5 w-5 text-muted-foreground peer-focus:text-primary" />
      {search ? (
        <button
          className="absolute right-2.5 text-muted-foreground peer-focus:text-primary"
          onClick={() => setSearch('')}
        >
          <XIcon className="h-5 w-5" />
        </button>
      ) : null}
    </div>
  );
}
