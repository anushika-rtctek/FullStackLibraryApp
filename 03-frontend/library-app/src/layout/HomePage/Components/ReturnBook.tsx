export const ReturnBook = () => {
    return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-mg-3 mb-3">
            <div className="text-center">
                <img src={require('./../../../Images/BooksImages/book-luv2code-1000.png')}
                    width='151'
                    height='233'
                    alt="books" />
                <h6 className="mt-6">Book</h6>
                <p>Luv2Code</p>
                <a className="btn main-color text-white" href="#">Reserve</a>
            </div>
        </div>
    )
}