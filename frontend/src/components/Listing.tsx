import { useEffect, useState } from "react";
import { chefRat } from "../Types";
import "../css/Listing.css";
import Switch from "./Switch";

export default function Listing({ pagesOn = false, searchOn = false, orderOn = false, deleteOn = false, switchOn = false, editOn = false, plusMinusOn = false}: { pagesOn?: boolean, searchOn?: boolean, orderOn?: boolean, deleteOn?: boolean, switchOn?: boolean, editOn?: boolean, plusMinusOn?: boolean}) {
    const [data, setData] = useState<{ data: chefRat[], totalPages: number } | null>(null);
    const [sortData, setSortData] = useState<{ col: string, direction: string } | undefined>(undefined);
    const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
    const [page, setPage] = useState<number>(1);
    useEffect(() => {
        load(5, page, searchQuery, sortData?.col, sortData?.direction);
        console.log('loaded')
    }, [sortData, searchQuery, page]);

    function search(event: React.ChangeEvent<HTMLInputElement>) {
        setPage(1);
        setSearchQuery(event.target.value);
    }

    async function load(limit?: number, page?: number, search?: string, orderBy?: string, direction?: string,) {
        const params: any = {};
        if (searchOn && search) params.searchterm = search;
        if (pagesOn && limit) params.limit = limit;
        if (pagesOn && page) params.page = page;
        if (orderOn && orderBy) params.orderby = orderBy;
        if (orderOn && direction) params.order = direction;
        const response = await fetch('http://localhost:3000/rats?' + new URLSearchParams(params));
        setData(await response.json());
    }

    function sort(event: any) {
        if (!orderOn) return;
        let direction;
        const dir = event.target.classList.contains('ASC');
        for (let e of document.getElementsByClassName('DESC')) {
            e.classList.remove('DESC');
        }
        for (let e of document.getElementsByClassName('ASC')) {
            e.classList.remove('ASC');
        }
        if (dir) {
            direction = 'DESC';
            event.target.classList.add('DESC');
        }
        else {
            direction = 'ASC';
            event.target.classList.add('ASC');
        }
        setPage(1);
        setSortData({ col: event.target.dataset.name, direction });
    }

    function changePage(event: any) {
        const pageValue = event.target.dataset.page;
        if (pageValue == "b") setPage(Math.max(1, page - 1));
        else if (pageValue == "f") setPage(Math.min(data!.totalPages, page + 1));
        else setPage(pageValue);
    }

    function del(event: any){
        const parentElement = event.target.parentElement
        const id = parentElement.dataset.id;
        fetch("http://localhost:3000/rats/"+id, {method: "DELETE"});
        parentElement.remove();
    }
    function onChangege(event: any){
        if(event.key == 'Enter'){
            event.target.blur();
        }
    }

    function patch(event : any){
        console.log("sdasd");
        const parentElement = event.target.parentElement;
        const id = parentElement.dataset.id;
        let moded : any = {}
        moded[event.target.dataset.name] = event.target.innerHTML; 
        fetch(`http://localhost:3000/rats/${id}`, {method: "PATCH", headers:{'Content-Type': 'application/json',}, body: JSON.stringify(moded)});
    }

    function switchPatch(event : any){
        const parentElement = event.target.parentElement.parentElement.parentElement;
        const id = parentElement.dataset.id;
        let moded = {is_working: (event.target.checked ? 1 : 0)}
        fetch(`http://localhost:3000/rats/${id}`, {method: "PATCH", headers:{'Content-Type': 'application/json',}, body: JSON.stringify(moded)});
    }

    function plusMinusInc(event: any) {
        plusMinus(event, 100);
    }

    function plusMinusDec(event: any) {
        plusMinus(event, -100);
    }

    function plusMinus(event: any, value: number) {
        const element = event.target;
        const id = element.parentElement.parentElement.dataset.id;
        const children = element.parentElement.parentElement.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i].dataset.name == "salary") {
                const text = children[i].children[1];
                text.innerHTML = (parseFloat(text.innerHTML) + value).toFixed(2);
            }
        }
        fetch(`http://localhost:3000/rats/change/${id}`, {method: "PATCH", headers:{'Content-Type': 'application/json',}, body: JSON.stringify({value: value})});
    }

    let pages;
    if (data?.totalPages) {
        pages = [];
        for (let i = 1; i <= data?.totalPages; i++) pages.push(i);
    }

    return <>
        <div className="container">
            {searchOn && (
                <div className="search">
                    <input type="text" name="search" onChange={search} />
                    <div></div>
                </div>)}
            <table>
                <thead>
                    <tr>
                        <th className={orderOn ? "sort" : ""} onClick={sort} data-name={"ranking"}>Ranking</th>
                        <th className={orderOn ? "sort" : ""} onClick={sort} data-name={"species"}>Species</th>
                        <th className={orderOn ? "sort" : ""} onClick={sort} data-name={"name"}>Name</th>
                        <th className={orderOn ? "sort" : ""} onClick={sort} data-name={"job"}>Job</th>
                        <th className={orderOn ? "sort" : ""} onClick={sort} data-name={"special_dish"}>Special Dish</th>
                        <th className={orderOn ? "sort" : ""} onClick={sort} data-name={"height"}>Height</th>
                        <th className={orderOn ? "sort" : ""} onClick={sort} data-name={"salary"}>Salary</th>
                        { switchOn && <th className={orderOn ? "sort" : ""} onClick={sort} data-name={"is_working"}>Is Working</th> }
                    </tr>
                </thead>
                <tbody>
                    {data && data.data.map((e) => <tr key={e.id} data-id={e.id}>
                        <td>{e.ranking}</td>
                        <td contentEditable={editOn} onKeyDown={onChangege} data-name={"species"} onBlur={editOn ? patch : () => {}}>{e.species}</td>
                        <td contentEditable={editOn} onKeyDown={onChangege} data-name={"name"} onBlur={editOn ? patch : () => {}}>{e.name}</td>
                        <td contentEditable={editOn} onKeyDown={onChangege} data-name={"job"} onBlur={editOn ? patch : () => {}}>{e.job}</td>
                        <td contentEditable={editOn} onKeyDown={onChangege} data-name={"special_dish"} onBlur={editOn ? patch : () => {}}>{e.special_dish}</td>
                        <td contentEditable={editOn} onKeyDown={onChangege} data-name={"height"} onBlur={editOn ? patch : () => {}}>{e.height}</td>
                        <td contentEditable={editOn} onKeyDown={onChangege} data-name={"salary"} onBlur={editOn ? patch : () => {}}>{plusMinusOn && <button onClick={plusMinusDec}>←</button>}<span>{e.salary}</span>{plusMinusOn && <button onClick={plusMinusInc}>→</button>}</td>
                        <td><Switch round editOn={switchOn || editOn} defaultValue={e.is_working} onChange={switchPatch}/></td>
                        {deleteOn && <td onClick={del}>Delete</td>}
                    </tr>)}
                </tbody>
            </table>
            {pagesOn && pages && <div className="pages">
                <button data-page="b" onClick={changePage}>←</button>
                {pages.map(e => <button key={e} data-page={e} onClick={changePage}>{e}</button>)}
                <button data-page="f" onClick={changePage}>→</button>
            </div>}
        </div>
    </>
} 