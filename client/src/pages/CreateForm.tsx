import SearchInput from '../components/shared/SearchInput';

export default function CreateForm() {
  return (
    <div className="flex">
      <section className="w-80 space-y-5">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold">Form Elements</h1>
          <h2 className="text-sm text-muted-foreground">
            Drag elements to the right
          </h2>
        </div>
        <SearchInput placeholder="Search Components" />
      </section>
      <section className="flex-grow"></section>
    </div>
  );
}
