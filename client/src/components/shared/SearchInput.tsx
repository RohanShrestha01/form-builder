import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SearchIcon, XIcon } from 'lucide-react';

interface Props {
  placeholder: string;
  classname?: string;
  disabled?: boolean;
  debounce?: boolean;
}

export default function SearchInput({
  placeholder,
  classname = '',
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
    <div className={`relative flex items-center ${classname}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={e => setSearch(e.target.value)}
        spellCheck="false"
        className="peer h-9 w-full rounded-md border border-muted-foreground px-10 text-sm placeholder:text-muted-foreground hover:border-foreground focus:border-primary focus:outline-none disabled:pointer-events-none disabled:select-none"
        disabled={disabled}
      />
      <SearchIcon className="absolute left-2.5 h-5 w-5 text-muted-foreground peer-hover:text-foreground peer-focus:text-primary" />
      {search ? (
        <button
          className="absolute right-2.5 text-muted-foreground peer-hover:text-foreground peer-focus:text-primary"
          onClick={() => setSearch('')}
        >
          <XIcon className="h-5 w-5" />
        </button>
      ) : null}
    </div>
  );
}
