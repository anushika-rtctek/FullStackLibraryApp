class ReviewModel {
    id: number
    userEmail: string
    date: string
    rating: number
    bookId: number
    reviewDesc?: string

    constructor(id: number, userEmail: string, date: string, rating: number, bookId: number,
        reviewDesc: string) {
        this.id = id
        this.userEmail = userEmail
        this.date = date
        this.rating = rating
        this.bookId = bookId
        this.reviewDesc = reviewDesc
    }
}

export default ReviewModel