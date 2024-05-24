import { useEffect, useState } from "react"
import BookModel from "../../models/BookModel"
import { SpinnerLoading } from "../Utils/SpinnerLoading"
import { SearchBooks } from "./SearchBooks"
import axios from "axios"
import { Pagination } from "../Utils/Pagination"

export const SearchBooksPage = () => {

    //axios.defaults.withCredentials = true

    const [books, setBooks] = useState<BookModel[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [booksPerPage] = useState(5)
    const [totalBooks, setTotalBooks] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl:string = 'http://localhost:8080/api/books'
            
            const url:string = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`
            const response = await axios.get(url)

            if(response.status !== 200){
                throw new Error("Something went wrong")
            }

            const responseData = response.data._embedded.books
            const loadedBooks:BookModel[] = []

            setTotalBooks(response.data.page.totalElements)
            setTotalPages(response.data.page.totalPages)

            for(const key in responseData){
                loadedBooks.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    img: responseData[key].img
                })
            }

            setBooks(loadedBooks)
            setIsLoading(false)
        } 

        fetchBooks().catch((error:any) => {
            setIsLoading(false)
            setHttpError(error.message)
        })

        window.scrollTo(0,0)
    }, [currentPage])

    if(isLoading){
        return (
            <SpinnerLoading/>
        )
    }

    if(httpError){
        return (
            <div className="m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    const indexOfLastItem: number = currentPage * booksPerPage
    const indexOfFirstItem: number = indexOfLastItem - booksPerPage +1
    let lastItem = (booksPerPage * currentPage <= totalBooks) ? indexOfLastItem : totalBooks

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    return (
        <div>
            <div className="container">
                <div>
                    <div className="row mt-5">
                        <div className="col-6">
                            <div className="d-flex">
                                <input className="form-control" role="search" 
                                    placeholder="Search" aria-labelledby="search"/> 
                                <button className="btn btn-outline-success">
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button"
                                    id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        Category
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li>
                                        <a className="dropdown-item" href="#">All</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Front End</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Back End</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Data</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">DevOps</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <h5>Number of Results: ({totalBooks})</h5>
                    </div>
                    <p>{indexOfFirstItem} to {lastItem} of {totalBooks} items:</p>
                    {books.map(book => (
                        <SearchBooks book={book} key={book.id}/>
                    ))}
                    {totalPages > 1 &&
                    <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
                </div>
            </div>
        </div>
    )
}