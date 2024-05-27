import { useEffect, useState } from "react"
import BookModel from "../../models/BookModel"
import axios from "axios"
import { SpinnerLoading } from "../Utils/SpinnerLoading"
import { StarsReview } from "../Utils/StarsReview"
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox"
import ReviewModel from "../../models/ReviewModel"
import { LatestReviews } from "./LatestReviews"

export const BookCheckoutPage = () => {

    const [book, setBook] = useState<BookModel>()
    const [isBookLoading, setIsBookLoading] = useState(true)
    const [httpError, setHttpError] = useState(null)

    const [reviews, setReviews] = useState<ReviewModel[]>([])
    const [totalStars, setTotalStars] = useState(0)
    const [isReviewLoading, setIsReviewLoading] = useState(true)

    const bookId = (window.location.pathname).split('/')[2]

    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl: string = `http://localhost:8080/api/books/${bookId}`
            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findBookById?bookId=${bookId}`;

            const response = await axios.get(baseUrl)
            const reviewResponse = await axios.get(reviewUrl);

            if (response.status !== 200 || reviewResponse.status !== 200) {
                throw new Error('Something went wrong!')
            }

            const responseData = response.data
            const loadedBook: BookModel = {
                id: responseData.id,
                title: responseData.title,
                author: responseData.author,
                description: responseData.description,
                copies: responseData.copies,
                copiesAvailable: responseData.copiesAvailable,
                category: responseData.category,
                img: responseData.img
            }

            const reviewResponseData = reviewResponse.data._embedded.reviews
            const loadedReviews: ReviewModel[] = []
            let weightedStarReviews: number = 0
            for (const key in reviewResponseData) {
                loadedReviews.push({
                    id: reviewResponseData[key].id,
                    userEmail: reviewResponseData[key].userEmail,
                    date: reviewResponseData[key].date,
                    rating: reviewResponseData[key].rating,
                    bookId: reviewResponseData[key].bookId,
                    reviewDesc: reviewResponseData[key].reviewDesc
                })
                weightedStarReviews = weightedStarReviews + reviewResponseData[key].rating
            }

            if (loadedReviews) {
                const totalRating = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1)
                setTotalStars(Number(totalRating))
            }

            setBook(loadedBook)
            setIsBookLoading(false)
            setReviews(loadedReviews)
            setIsReviewLoading(false)
        }

        fetchBook().catch((error: any) => {
            setIsBookLoading(false)
            setIsReviewLoading(false)
            setHttpError(error.message)
        })
    }, [])

    if (isBookLoading || isReviewLoading) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className="m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div>
            <div className="container d-none d-lg-block mt-5">
                <div className="d-flex row-mt-5">
                    <div className="col-sm-2 col-md-2">
                        {book?.img ?
                            <img src={book?.img} width='226' height='349' alt="book" /> :
                            <img src={require('../../Images/BooksImages/book-luv2code-1000.png')} width='226' height='349' alt="book" />
                        }
                    </div>
                    <div className="col-sm-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{book?.title}</h2>
                            <h5 className="text-primary">{book?.author}</h5>
                            <p className="lead">{book?.description}</p>
                            <StarsReview rating={totalStars} size={32} />
                        </div>
                    </div>
                    <CheckoutAndReviewBox book={book} mobile={false} />
                </div>
                <hr />
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
            </div>
            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    {book?.img ?
                        <img src={book?.img} width='226' height='349' alt="book" /> :
                        <img src={require('../../Images/BooksImages/book-luv2code-1000.png')} width='226' height='349' alt="book" />
                    }
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h5 className="text-primary">{book?.author}</h5>
                        <p className="lead">{book?.description}</p>
                        <StarsReview rating={4} size={32} />
                    </div>
                </div>
                <CheckoutAndReviewBox book={book} mobile={true} />
                <hr />
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
            </div>
        </div>
    )
}