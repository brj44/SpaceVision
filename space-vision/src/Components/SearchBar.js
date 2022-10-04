import './SearchBar.css'

const SearchBar = () =>(
    <form action="/" method="get">
        <label htmlFor="header-search">
           <span className="Search-Bar">Enter Query</span> 
        </label>
        <input className='Search-Input-Box'
            type="text"
            id="header-search"
        
            placeholder="Search NASA API "
            name="s" 
        />
        <button className='Search-Button' type="submit">Search</button>
    </form>
);

export default SearchBar;