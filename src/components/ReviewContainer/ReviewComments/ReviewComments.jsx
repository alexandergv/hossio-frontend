import './ReviewComments.css';
import ReviewStars from 'components/ReviewStars/ReviewStars';

const ReviewComments = ({reviews}) => {
  return (
    <div className="review-comments">
      <h3>Reseñas</h3>
      {reviews.map((review, index) => (
        <div key={index} className="review">
          <p className="review-text">{review.text}</p>
          <p className="review-author">- {review.author ? review.author : 'Anónimo.'}</p>
          <ReviewStars readOnly={true} ratingScore={review.rating} />
        </div>
      ))}
    </div>
  );
};

export default ReviewComments;
