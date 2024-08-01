import './ReviewComments.css';
import ReviewStars from 'components/ReviewStars/ReviewStars';
import ReviewCommentsSkeleton from './ReviewCommentsSkeleton';

const ReviewComments = ({reviews, isloading}) => {
  return (
    <div className="review-comments">
      <h3>Reseñas</h3>
      <hr/>
      {isloading ? <ReviewCommentsSkeleton/> :
      (reviews.length > 0
        ? (reviews.map((review, index) => (
        <div key={index} className="review">
          <p className="review-text">{review.text}</p>
          <p className="review-author">- {review.author ? review.author : 'Anónimo.'}</p>
          <ReviewStars readOnly={true} ratingScore={review.rating} />
        </div>
      )))
      : (
        <div className="review"> Aún no hay reseñas para este lugar.</div>
      ))
      }
    </div>
  );
};

export default ReviewComments;
